import mongoose, { Schema, Document } from "mongoose";

// Define Submission interface (if it exists)
interface Submission {
    problemId: string;
    status: string;
    submittedAt: Date;
}

interface DUser extends Document {
    username: string;
    email: string;
    password: string;
    submissions?: Submission[];
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
        unique: true, // Ensure unique usernames
        trim: true,   // Trim whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
        lowercase: true, // Normalize case
    },
    password: {
        type: String,
        required: true,
    },
    submissions: [
        {
            problemId: { type: String, required: true },
            status: { type: String, required: true },
            submittedAt: { type: Date, default: Date.now },
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

// Hash password before saving (if using authentication)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const bcrypt = await import("bcryptjs");
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;
