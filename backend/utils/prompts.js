// src/utils/prompts.js

export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => {
  return `Generate exactly ${numberOfQuestions} technical interview questions and answers for a ${role} with ${experience} years of experience, focusing on ${topicsToFocus}.
  
  Strict Instructions:
  1. Return ONLY a VALID JSON object with a key "questions" containing an array of objects.
  2. Format: {"questions": [{"question": "...", "answer": "..."}]}
  3. Keep the "answer" clear and beginner-friendly. 
  4. If you include code inside the answer string, ensure all double quotes are escaped (e.g., \\") and newlines are escaped (e.g., \\n).
  5. IMPORTANT: Do not include markdown code block backticks (like \`\`\`json) around the response.
  6. Ensure the JSON is complete and not cut off.`;
};

export const conceptExplainPrompt = (question) => {
  return `You are an AI trained to explain technical concepts.
  
  Task:
  - Explain the following interview question in depth: "${question}"
  - Format the response as a SINGLE VALID JSON OBJECT.
  - Required JSON keys: "title" and "explanation".
  - Inside the "explanation" string, use plain text and simple formatting.
  - If using code examples, avoid using triple backticks (\`\`\`) if they cause JSON parsing issues. Use single quotes for code snippets.
  - RETURN ONLY THE JSON. No extra commentary.`;
};