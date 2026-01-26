import Session from "../models/Session.js";
import Question from "../models/Question.js";

/* ========== CREATE SESSION ========== */
export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    // 1. Session එක සාදන්න
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: []
    });

    // 2. Questions check කරලා save කිරීම
    if (questions && Array.isArray(questions) && questions.length > 0) {
      const formattedQuestions = questions.map(q => ({
        session: session._id,
        question: q.question || q.Question || "No question generated",
        answer: q.answer || q.Answer || ""
      }));

      const savedQuestions = await Question.insertMany(formattedQuestions);
      session.questions = savedQuestions.map(doc => doc._id);
      await session.save();
    }

    // 3. අවසානයේදී full data එක populate කරලා යවනවා
    const populatedSession = await Session.findById(session._id).populate("questions");
    res.status(201).json({ success: true, session: populatedSession });

  } catch (error) {
    console.error("CREATE SESSION ERROR:", error);
    res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
};

/* ========== DELETE SESSION ========== */
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this session" });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(200).json({ success: true, message: "Session and linked questions deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ========== GET ALL SESSIONS FOR LOGGED-IN USER ========== */
export const getMySessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({ user: userId })
      .populate("questions")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ========== GET SINGLE SESSION BY ID ========== */
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("questions");
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
