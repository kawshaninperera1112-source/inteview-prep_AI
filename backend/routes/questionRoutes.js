// backend/routes/questionRoutes.js
import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { generateInterviewQuestions } from "../controllers/aiController.js";
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from "../controllers/questionController.js";

const router = express.Router();

// ✅ AI logic routes
router.post("/generate", protect, generateInterviewQuestions);

// ✅ Add questions to session
router.post("/add-to-session", protect, addQuestionsToSession);

// ✅ Pin / Unpin a question
// backend/routes/questionRoutes.js

// router.patch වෙනුවට router.post ලෙස වෙනස් කරන්න
router.patch("/:id/pin", protect, togglePinQuestion);

// ✅ Update question note
router.put("/:id/note", protect, updateQuestionNote);

// 🔹 Make it default export for ES Modules
export default router;
