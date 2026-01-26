// backend/controllers/aiController.js
import groq from "../utils/groqClient.js";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompts.js";

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions = 6 } = req.body;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({ message: "Role, experience, and topicsToFocus are required" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a JSON-only generator. You output a JSON object containing a key 'questions' which is an array of question/answer objects.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { "type": "json_object" }, 
      temperature: 0.1, 
      max_tokens: 3000, // ✅ Token ප්‍රමාණය වැඩි කළා (කැඩී යාම වැළැක්වීමට)
    });

    const rawText = completion.choices[0]?.message?.content || "";

    try {
      // Groq json_object format එකේදී කෙලින්ම parse කළ හැක
      const parsedData = JSON.parse(rawText);
      // අපේ prompt එක අනුව 'questions' key එක ඇතුළේ array එක තිබිය යුතුයි
      const questions = parsedData.questions || parsedData; 
      res.status(200).json({ questions });
    } catch (err) {
      console.error("Parse Error:", rawText);
      throw new Error("AI returned invalid JSON structure");
    }

  } catch (error) {
    console.error("Groq AI Error:", error.message);
    res.status(500).json({ message: "AI generation failed", error: error.message });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const prompt = conceptExplainPrompt(question);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful programming tutor that outputs ONLY JSON." },
        { role: "user", content: prompt },
      ],
      response_format: { "type": "json_object" },
      temperature: 0.2,
      max_tokens: 2500, // ✅ මෙහිත් tokens වැඩි කළා
    });

    const rawText = completion.choices[0]?.message?.content || "";

    try {
      const explanationObj = JSON.parse(rawText);
      res.status(200).json({ explanation: explanationObj });
    } catch (err) {
      throw new Error("Failed to parse AI explanation JSON");
    }

  } catch (error) {
    console.error("Groq AI Error:", error.message);
    res.status(500).json({ message: "Failed to generate explanation", error: error.message });
  }
};

export { generateInterviewQuestions, generateConceptExplanation };