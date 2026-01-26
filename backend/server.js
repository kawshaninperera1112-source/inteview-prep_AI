import dotenv from "dotenv";
dotenv.config();



import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

// ✅ 1. Uploads folder create if not exists
const __dirname = path.resolve(); // ES Modules way to get __dirname
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// DB connection
connectDB();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", 'PATCH',"DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Serve uploads folder as static
app.use("/uploads", express.static(uploadDir));

// Health Check
app.get("/", (req, res) => res.send("Interview AI API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", imageRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📂 Static files served from: ${uploadDir}`);
});
