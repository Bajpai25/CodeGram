import express from "express";
import { writeTestFile } from "../utils/createTest";
import ProblemModel from "../models/problem";
import UserModel from "../models/user";
import { DProblem } from "../models/problem";
import {
    sortByAcceptance,
    sortByDifficulty,
    sortByTitle,
} from "../utils/utils";

// Import Types from mongoose for type checking
import { Types, Document } from "mongoose";

// Define the Submission interface directly in this file to avoid conflicts
interface Submission {
    problem_name: string;
    status: string;
    error?: string;
    time: Date;
    runtime: number;
    language: string;
    memory: number;
    code_body?: string;
    input?: any;
    expected_output?: any;
    user_output?: any;
}

const problem = express.Router();

problem.post("/all", async (req, res) => {
    const { id } = req.body;
    const search = req.query.search || "";
    const difficulty = req.query.difficulty || "";
    const acceptance = req.query.acceptance || "";
    const title = req.query.title || "";
    try {
        const allProblems = await ProblemModel.find(
            { "main.name": { $regex: search, $options: "i" } },
            "main.id main.name main.acceptance_rate_count main.difficulty main.like_count main.dislike_count"
        )
            .sort({ "main.id": 1 })
            .exec();
        
        // Cast to any to avoid type conflicts
        const sortedByTitle = sortByTitle(
            title.toString() as any,
            allProblems
        );
        
        const sortedByDifficulty = sortByDifficulty(
            difficulty.toString() as any,
            sortedByTitle
        );
        
        const allProblemsSorted = sortByAcceptance(
            acceptance.toString() as any,
            sortedByDifficulty
        );
        
        const user = await UserModel.findById(id);
        const sOrA = {
            solved: user?.problems_solved,
            attempted: user?.problems_attempted,
        };
        let allProblemsArray: DProblem[] = JSON.parse(
            JSON.stringify(allProblemsSorted)
        );
        if (sOrA.attempted) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.attempted.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "attempted";
                }
            }
        }
        if (sOrA.solved) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.solved.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "solved";
                }
            }
        }
        res.json(allProblemsArray);
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Internal Server Error" });
    }
});

problem.post<
    { name: string },
    Submission[],
    { code: string; id: string; problem_name: string }
>("/submit/:name", async (req, res) => {
    const { name } = req.params;
    const { id, problem_name } = req.body;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        const user = await UserModel.findById(id);
        if (!user) {
            res.json([
                {
                    problem_name: problem_name,
                    status: "Runtime Error",
                    error: "user not found",
                    time: new Date(),
                    runtime: 0,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                    code_body: undefined,
                },
            ]);
            return;
        }
        let history: Submission[] | null;
        if (user.submissions) {
            // Cast user.submissions to our Submission type
            history = user.submissions as unknown as Submission[];
        } else {
            history = null;
        }
        if (problem) {
            writeTestFile(req.body.code, problem.test, problem.function_name)
                .then(async (resolve) => {
                    if (resolve.stdout != undefined) {
                        console.log(resolve.stdout);
                        let submission: Submission[] = [
                            {
                                problem_name: problem_name,
                                status: resolve.stdout.status,
                                error: resolve.stdout.error_message,
                                time: resolve.stdout.date,
                                runtime: resolve.stdout.runtime,
                                language: "JavaScript",
                                memory: Math.random() * 80,
                                code_body: resolve.code_body,
                                input: resolve.stdout.input,
                                expected_output: resolve.stdout.expected_output,
                                user_output: resolve.stdout.user_output,
                            },
                        ];
                        if (history != null) {
                            submission.push(...history);
                        }
                        const subsByName = submission.filter(
                            (elem) => elem.problem_name === problem_name
                        );
                        // Use type assertion to save submissions
                        user.submissions = submission as any;
                        if (submission[0].status === "Accepted") {
                            if (!user.problems_solved.includes(problem_name)) {
                                user.problems_solved.push(problem_name);
                                user.problems_solved_count += 1;
                            }
                        } else {
                            if (
                                !user.problems_attempted.includes(problem_name)
                            ) {
                                user.problems_attempted.push(problem_name);
                            }
                        }
                        await user.save();
                        res.json(subsByName);
                    }
                })
                .catch(async (e) => {
                    let submission: Submission[] = [
                        {
                            problem_name: problem_name,
                            status: "Runtime Error",
                            error: String(e),
                            time: new Date(),
                            runtime: 0,
                            language: "JavaScript",
                            memory: Math.random() * 80,
                            code_body: undefined,
                        },
                    ];
                    if (history) {
                        submission.push(...history);
                    }
                    if (!user.problems_attempted.includes(problem_name)) {
                        user.problems_attempted.push(problem_name);
                    }
                    const subsByName = submission.filter(
                        (elem) => elem.problem_name === problem_name
                    );
                    // Use type assertion to save submissions
                    user.submissions = submission as any;
                    await user.save();
                    res.json(subsByName);
                });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json([]);  // Return empty array to match the return type
    }
});

problem.post<{ name: string }, Submission[], { id: string }>(
    "/submissions/:name",
    async (req, res) => {
        const { name } = req.params;
        const { id } = req.body;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                res.json([]);
                return;
            }
            if (!user.submissions) {
                res.json([]);
                return;
            }
            
            // Cast user.submissions to our Submission type and filter by problem_name
            const submissions = user.submissions as unknown as Submission[];
            const subsByName = submissions.filter(
                (elem) => elem.problem_name === name
            );
            res.json(subsByName);
        } catch (e) {
            console.log(e);
            res.json([]);
        }
    }
);

problem.post("/:name", async (req, res) => {
    const { name } = req.params;
    const { id } = req.body;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        const user = await UserModel.findById(id);
        if (!problem) {
            res.json({ error: "problem not found" });
            return;
        }
        
        const problemJson: DProblem = JSON.parse(JSON.stringify(problem));
        if (user?.problems_attempted.includes(name)) {
            problemJson.main.status = "attempted";
        }
        if (user?.problems_solved.includes(name)) {
            problemJson.main.status = "solved";
        }
        
        res.json(problemJson);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

problem.get("/:name/editorial", async (req, res) => {
    const name = req.params.name;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        if (problem) {
            const response = problem.editorial;
            res.json(response);
        } else {
            res.status(404).json({ error: "Editorial not found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default problem;