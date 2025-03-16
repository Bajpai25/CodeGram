import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index";
import { customCors } from "./middlewares/cors";

const MONGODB_URI: string = process.env.MONGODB_URI || "";
const PORT: number = Number(process.env.PORT) || 5000;

// Validate MongoDB URI
if (!MONGODB_URI) {
    console.warn("⚠️ Warning: MONGODB_URI is not set in environment variables.");
}

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Exit if DB connection fails
    });

export const db = mongoose.connection;

// Handle MongoDB errors after connection
db.on("error", (err) => console.error("MongoDB error:", err));
db.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));

// Initialize Express App
const app = express();

// Middleware
app.use(customCors); // Custom CORS middleware
// app.use(cors()); // Uncomment this if using default CORS
app.use(express.json());

// API Routes
app.use("/api", router);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});
