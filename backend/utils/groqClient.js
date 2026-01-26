// utils/groqClient.js
import dotenv from "dotenv";
dotenv.config(); // <-- must be first

import { Groq } from "groq-sdk";

// Throw error if key missing
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env file. Please add your key.");
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default groq;
