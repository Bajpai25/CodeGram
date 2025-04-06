import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/index";
import { customCors } from "./middlewares/cors";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;
const PORT: number = Number(process.env.PORT) || 5001;

// Validate MongoDB URI
if (!MONGODB_URI) {
    console.error("❌ Error: MONGODB_URI is not set in environment variables.");
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

export const db = mongoose.connection;

// Handle MongoDB connection events
db.on("error", (err) => console.error("❌ MongoDB error:", err));
db.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));

db.once("open", () => console.log("🔗 MongoDB connection is open"));

// Initialize Express App
const app = express();

// Middleware
app.use(customCors);
app.use(express.json());

// API Routes
app.use("/api", router);

// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ success: true, message: "Server is running" });
});

// Global Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
