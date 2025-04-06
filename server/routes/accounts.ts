import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Filter from "bad-words";
import dotenv from "dotenv";
import UserModel from "../models/user";
import { authenticateToken } from "../middlewares/token";
import { existsEmail, existsUsername } from "../utils/utils";
import { z } from "zod"; // Using zod for validation
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

const accounts = express.Router();

// TypeScript interfaces
interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

interface SignupResponse {
    id?: string;
    token?: string;
    success: boolean;
    message: string;
}

interface LoginRequest {
    username_or_email: string;
    password: string;
}

interface LoginResponse {
    id?: string;
    token?: string;
    success: boolean;
    message: string;
}

// ✅ Zod Schema for Validation
const signupSchema = z.object({
    username: z.string().min(3).max(15).regex(/^[a-zA-Z0-9_-]+$/, "Invalid username"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

// 📌 Signup Route
accounts.post<{}, SignupResponse, SignupRequest>("/signup", async (req: Request, res: Response) => {
    try {
        const validation = signupSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ success: false, message: validation.error.errors[0].message });
        }

        const { username, email, password } = req.body;
        const filter = new Filter();

        if (filter.isProfane(username)) {
            return res.status(400).json({ success: false, message: "Username contains inappropriate words." });
        }

        if (await existsUsername(username)) {
            return res.status(409).json({ success: false, message: "Username already exists." });
        }

        if (await existsEmail(email)) {
            return res.status(409).json({ success: false, message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error("ACCESS_TOKEN_SECRET is not defined in environment variables");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        try {
            const token = jwt.sign(
                { id: newUser._id, username: newUser.username }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: "1h" }
            );
            
            return res.status(201).json({ 
                id: newUser._id.toString(), 
                token, 
                success: true, 
                message: "Account created successfully" 
            });
        } catch (jwtError) {
            console.error("JWT signing error:", jwtError);
            await UserModel.findByIdAndDelete(newUser._id);
            return res.status(500).json({ success: false, message: "Error generating authentication token" });
        }
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ success: false, message: "Error creating account" });
    }
});

// 📌 Login Route
accounts.post<{}, LoginResponse, LoginRequest>("/login", async (req: Request, res: Response) => {
    const { username_or_email, password } = req.body;

    if (!username_or_email || !password) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        const user = await UserModel.findOne({ $or: [{ username: username_or_email }, { email: username_or_email }] });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.error("ACCESS_TOKEN_SECRET is not defined in environment variables");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1h" }
        );

        return res.json({ 
            id: user._id.toString(), 
            token, 
            success: true, 
            message: "Logged in successfully" 
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Error logging in." });
    }
});

// 📌 Delete Account Route
accounts.post("/delete/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        return res.json({ success: true, message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error deleting account." });
    }
});

// 📌 Get User Info by ID (✨ NEW ROUTE)
accounts.get("/id/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            problems_solved: user.problems_solved,
            problems_attempted: user.problems_attempted,
            submissions: user.submissions,
        });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default accounts;