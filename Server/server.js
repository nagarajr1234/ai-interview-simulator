import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Simulator Backend is running!",
  });
});

app.post("/api/generate-questions", async (req, res) => {
  const {
    role,
    experience,
    difficulty,
    interviewType,
  } = req.body;

  try {
    const prompt = `
You are an AI interviewer.

Generate 5 interview questions for:

Role: ${role}
Experience: ${experience}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Requirements:
- Questions must be relevant to the selected role.
- Match the candidate's experience level.
- Match the selected difficulty.
- Match the interview type.
- Do not repeat questions.
- Return only the questions.
- Number them from 1 to 5.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      success: true,
      questions: response.text,
    });
  } catch (error) {
    console.error("Question Generation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate interview questions",
    });
  }
});
// AI Answer Evaluation
app.post("/api/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  try {
    const prompt = `
You are an AI interview evaluator.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate's answer.

Give the response in this format:

Score: X/10

Feedback:
Give a short explanation about the answer.

Strengths:
Mention what the candidate did well.

Improvements:
Mention what the candidate should improve.

Keep the evaluation simple and suitable for a fresher.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      success: true,
      evaluation: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    res.status(500).json({
      success: false,
      message: "AI evaluation failed",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});