import express from "express";
import { writeTestFile } from "../utils/createTest";
import ProblemModel, { DProblem } from "../models/problem";
import UserModel from "../models/user";
import {
    sortByAcceptance,
    sortByDifficulty,
    sortByTitle,
    Sort
} from "../utils/utils"

import { Types } from "mongoose";

// Define interface matching the one used in your routes
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
            { "main.name": { $regex: search.toString(), $options: "i" } },
            "main.id main.name main.acceptance_rate_count main.difficulty main.like_count main.dislike_count"
        ).sort({ "main.id": 1 });

        // Fix the sorting function calls by providing proper type casting or using appropriate types
        const sortedByTitle = sortByTitle(title as Sort, allProblems);
        const sortedByDifficulty = sortByDifficulty(difficulty as Sort, sortedByTitle);
        const allProblemsSorted = sortByAcceptance(acceptance as Sort, sortedByDifficulty);

        const user = await UserModel.findById(id);
        const solved = user?.problems_solved || [];
        const attempted = user?.problems_attempted || [];

        // Fix variable name: use allProblemsSorted instead of sorted
        const allProblemsArray: DProblem[] = JSON.parse(JSON.stringify(allProblemsSorted));
        for (const problem of allProblemsArray) {
            if (solved.includes(problem.main.name)) {
                problem.main.status = "solved";
            } else if (attempted.includes(problem.main.name)) {
                problem.main.status = "attempted";
            }
        }

        res.json(allProblemsArray);
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Submit code
problem.post<{ name: string }, Submission[], { code: string; id: string; problem_name: string }>(
    "/submit/:name",
    async (req, res) => {
        const { name } = req.params;
        const { code, id, problem_name } = req.body;

        try {
            const problem = await ProblemModel.findOne({ "main.name": name });
            const user = await UserModel.findById(id);

            if (!user) {
                return res.json([
                    {
                        problem_name,
                        status: "Runtime Error",
                        error: "User not found",
                        time: new Date(),
                        runtime: 0,
                        language: "JavaScript",
                        memory: Math.random() * 80,
                    },
                ]);
            }

            let history = (user.submissions || []) as Submission[];

            if (!problem) {
                return res.status(404).json([
                    {
                        problem_name,
                        status: "Runtime Error",
                        error: "Problem not found",
                        time: new Date(),
                        runtime: 0,
                        language: "JavaScript",
                        memory: Math.random() * 80,
                    },
                ]);
            }

            try {
                const result = await writeTestFile(code, problem.test, problem.function_name);

                if (!result.stdout) throw new Error("No stdout returned");

                const newSubmission: Submission = {
                    problem_name,
                    status: result.stdout.status,
                    error: result.stdout.error_message,
                    time: result.stdout.date,
                    runtime: result.stdout.runtime,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                    code_body: result.code_body,
                    input: result.stdout.input,
                    expected_output: result.stdout.expected_output,
                    user_output: result.stdout.user_output,
                };

                const updatedSubmissions = [newSubmission, ...history];
                // Fix the type issue by explicitly casting to any
                user.submissions = updatedSubmissions as any;

                if (newSubmission.status === "Accepted") {
                    if (!user.problems_solved.includes(problem_name)) {
                        user.problems_solved.push(problem_name);
                        user.problems_solved_count += 1;
                    }
                } else if (!user.problems_attempted.includes(problem_name)) {
                    user.problems_attempted.push(problem_name);
                }

                await user.save();

                const filtered = updatedSubmissions.filter(
                    (s) => s.problem_name === problem_name
                );

                res.json(filtered);
            } catch (err) {
                const errorSubmission: Submission = {
                    problem_name,
                    status: "Runtime Error",
                    error: String(err),
                    time: new Date(),
                    runtime: 0,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                };

                user.submissions = [errorSubmission, ...history] as any;

                if (!user.problems_attempted.includes(problem_name)) {
                    user.problems_attempted.push(problem_name);
                }

                await user.save();

                res.json([errorSubmission]);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json([]);
        }
    }
);

// Get all submissions for a problem
problem.post<{ name: string }, Submission[], { id: string }>(
    "/submissions/:name",
    async (req, res) => {
        const { name } = req.params;
        const { id } = req.body;

        try {
            const user = await UserModel.findById(id);
            if (!user || !user.submissions) return res.json([]);

            // Fix by explicitly casting to our Submission type
            const submissions = user.submissions as unknown as Submission[];
            const filtered = submissions.filter((s) => s.problem_name === name);

            res.json(filtered);
        } catch (err) {
            console.error(err);
            res.json([]);
        }
    }
);

// Get problem by name
problem.post("/:name", async (req, res) => {
    const { name } = req.params;
    const { id } = req.body;

    try {
        const problem = await ProblemModel.findOne({ "main.name": name });
        if (!problem) return res.status(404).json({ error: "Problem not found" });

        const user = await UserModel.findById(id);
        const status = user?.problems_solved.includes(name)
            ? "solved"
            : user?.problems_attempted.includes(name)
            ? "attempted"
            : undefined;

        const problemJson: DProblem = JSON.parse(JSON.stringify(problem));
        if (status) problemJson.main.status = status;

        res.json(problemJson);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get editorial for a problem
problem.get("/:name/editorial", async (req, res) => {
    const { name } = req.params;

    try {
        const problem = await ProblemModel.findOne({ "main.name": name });
        if (!problem) return res.status(404).json({ error: "Editorial not found" });

        res.json(problem.editorial);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default problem;