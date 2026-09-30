import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../Data/questions";
import { evaluateAnswer } from "../Services/aiAPI";

function Interview() {
  const navigate = useNavigate();
  const location = useLocation();

  const interviewData = location.state || {
    role: "Frontend Developer",
    experience: "Fresher",
    difficulty: "Medium",
    interviewType: "Technical",
  };

  const generatedQuestions = interviewData.generatedQuestions || "";

const questions = generatedQuestions
  .split("\n")
  .filter((q) => q.trim() !== "")
  .map((q, index) => ({
    id: index + 1,
    question: q.replace(/^\d+[\.\)]\s*/, "").trim(),
  }));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const question = questions[currentQuestion];

const handleNext = async () => {
  if (!answer.trim()) {
    alert("Please enter your answer before continuing.");
    return;
  }
  setLoading(true);
  try {
    const result = await evaluateAnswer(
      question.question,
      answer
    );

    console.log("Backend Response:", result);

    const updatedAnswers = [
      ...answers,
      {
        questionId: question.id,
        question: question.question,
        answer: answer,
        evaluation: result,
      },
    ];

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    } else {
      navigate("/result", {
  state: {
    answers: updatedAnswers,
    totalQuestions: questions.length,
    interviewData: interviewData,
    saveResult: true,
  },
});
    }

  } catch (error) {
  alert("AI evaluation failed. Please try again.");
  console.error("Evaluation Error:", error);
}finally {
  setLoading(false);
}
};

  return (
    <div className="interview-page">

      <div className="interview-container">

        <div className="interview-header">

          <div>
            <p className="interview-label">
              AI INTERVIEWER
            </p>

            <h2>{interviewData.role} Interview</h2>
          </div>

          <div className="difficulty-badge">
  {interviewData.difficulty}
</div>

        </div>

        <div className="progress-section">

          <div className="progress-info">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}%
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>

        </div>

        <div className="question-card">

          <div className="question-number">
            Question {currentQuestion + 1}
          </div>

          <h1>{question.question}</h1>

          <div className="answer-section">

            <label>Your Answer</label>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
            ></textarea>

            <div className="answer-info">
              <span>
                Explain your answer clearly.
              </span>

              <span>
                {answer.length} characters
              </span>
            </div>

          </div>

          <button
  className="next-button"
  onClick={handleNext}
  disabled={loading}
>
  {loading
    ? "Evaluating..."
    : currentQuestion === questions.length - 1
    ? "Finish Interview"
    : "Next Question →"}
</button>

        </div>

      </div>

    </div>
  );
}

export default Interview;