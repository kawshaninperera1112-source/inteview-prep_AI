import express from "express";
import { 
    createSession, 
    getSessionById, 
    getMySessions, 
    deleteSession 
} from "../controllers/sessionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. අලුත් Session එකක් සෑදීම
router.post("/create", protect, createSession);

// 2. User ගේ සියලුම Sessions ලබා ගැනීම (මෙය /:id ට පෙර තිබිය යුතුය)
router.get("/my-sessions", protect, getMySessions);

// 3. ID එක මගින් නිශ්චිත Session එකක් ලබා ගැනීම
router.get("/:id", protect, getSessionById);

// 4. Session එකක් ඉවත් කිරීම
router.delete("/:id", protect, deleteSession);

export default router;
