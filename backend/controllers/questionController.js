// backend/controllers/questionController.js
import Question from "../models/Question.js";
import Session from "../models/Session.js";

/**
 * Add questions to an existing session
 */
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "sessionId and questions array are required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const formattedQuestions = questions.map(q => ({
      session: session._id,
      question: q.question || "No question",
      answer: q.answer || ""
    }));

    const savedQuestions = await Question.insertMany(formattedQuestions);

    session.questions.push(...savedQuestions.map(q => q._id));
    await session.save();

    res.status(200).json({ success: true, questions: savedQuestions });
  } catch (err) {
    console.error("Add Questions Error:", err);
    res.status(500).json({ message: "Failed to add questions", error: err.message });
  }
};

/**
 * Toggle pin/unpin for a question
 */
export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (err) {
    console.error("Toggle Pin Error:", err);
    res.status(500).json({ message: "Failed to toggle pin", error: err.message });
  }
};

/**
 * Update note for a question
 */
export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (err) {
    console.error("Update Note Error:", err);
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
};
