import express from "express";
import { generateInterviewQuestions, generateConceptExplanation } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limiter for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many AI requests. Please try again after 1 minute."
  },
});

router.post("/generate-questions", protect, aiLimiter, generateInterviewQuestions);
router.post("/generate-explanation", protect, aiLimiter, generateConceptExplanation);

export default router;
