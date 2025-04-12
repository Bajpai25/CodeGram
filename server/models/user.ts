import mongoose, { Schema, Document } from "mongoose";

// Define Submission interface that matches the one used in routes
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

interface DUser extends Document {
    username: string;
    email: string;
    password: string;
    submissions?: Submission[]; // Updated to match the Submission interface used in routes
    problems_starred: string[];
    problems_solved: string[];
    problems_attempted: string[];
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
}

// Define Schema
const userSchema = new Schema<DUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    submissions: [
        {
            problem_name: { type: String, required: true },
            status: { type: String, required: true },
            error: { type: String },
            time: { type: Date, default: Date.now },
            runtime: { type: Number, required: true },
            language: { type: String, required: true },
            memory: { type: Number, required: true },
            code_body: { type: String },
            input: { type: Schema.Types.Mixed },
            expected_output: { type: Schema.Types.Mixed },
            user_output: { type: Schema.Types.Mixed }
        },
    ],
    problems_starred: [{ type: String }],
    problems_solved: [{ type: String }],
    problems_attempted: [{ type: String }],
    problems_solved_count: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    solution_count: {
        type: Number,
        default: 0,
    },
    reputation_count: {
        type: Number,
        default: 0,
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const bcrypt = await import("bcryptjs");
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;