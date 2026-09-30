const API_URL = "http://localhost:5001/api/evaluate";

export const evaluateAnswer = async (question, answer) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to evaluate answer");
    }

    return await response.json();
  } catch (error) {
    console.error("Evaluation error:", error);
    throw error;
  }
};

export const generateQuestions = async (
  role,
  experience,
  difficulty,
  interviewType
) => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/generate-questions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          experience,
          difficulty,
          interviewType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Question generation error:", error);
    throw error;
  }
};