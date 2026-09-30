import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { saveInterview } from "../Services/interviewAPI";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const answers = location.state?.answers || [];
  const interviewData = location.state?.interviewData || {
  role: "Frontend Developer",
  experience: "Fresher",
  difficulty: "Medium",
  interviewType: "Technical",
};
  const totalQuestions = location.state?.totalQuestions || 0;

  const answeredQuestions = answers.length;
  const hasSaved = useRef(false);

  // Extract score from Gemini response
  const extractScore = (evaluation) => {
    if (!evaluation) return 0;

    const match = evaluation.match(/Score:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i);

    return match ? Number(match[1]) : 0;
  };

  // Calculate overall AI score
  const aiScores = answers
    .map((item) => extractScore(item.evaluation?.evaluation))
    .filter((score) => score > 0);

  const overallScore =
    aiScores.length > 0
      ? Math.round(
          (aiScores.reduce((total, score) => total + score, 0) /
            aiScores.length) *
            10
        )
      : 0;

  // Get a section from Gemini response
  const getSection = (text, sectionName, nextSectionNames = []) => {
    if (!text) return "No feedback available.";

    let pattern = `${sectionName}:\\s*([\\s\\S]*?)`;

    if (nextSectionNames.length > 0) {
      pattern += `(?=\\n(?:${nextSectionNames.join("|")}):|$)`;
    } else {
      pattern += `$`;
    }

    const match = text.match(new RegExp(pattern, "i"));

    return match ? match[1].trim() : "No feedback available.";
  };

useEffect(() => {
  const saveResult = async () => {
    if (answers.length === 0) {
      return;
    }

    // Save only when this is a new interview
    if (!location.state?.saveResult) {
      return;
    }

    // Prevent duplicate saving
    if (hasSaved.current) {
      return;
    }

    hasSaved.current = true;

    const interviewRecord = {
      role: interviewData.role,
      experience: interviewData.experience,
      difficulty: interviewData.difficulty,
      interviewType: interviewData.interviewType,
      score: overallScore,
      totalQuestions: totalQuestions,
      answeredQuestions: answeredQuestions,
      answers: answers,
      date: new Date().toISOString(),
    };

    try {
      await saveInterview(interviewRecord);
      console.log("Interview saved successfully!");
    } catch (error) {
      hasSaved.current = false;
      console.error("Could not save interview");
    }
  };

  saveResult();
}, [
  answers,
  totalQuestions,
  answeredQuestions,
  overallScore,
  interviewData,
  location.state,
]);

  return (
    <div className="result-page">
      <div className="result-container">

        {/* Header */}
        <div className="result-header">
          <p>INTERVIEW COMPLETED</p>

          <h1>
            Your Interview <span>Result</span>
          </h1>

          <h3>
            Here is a summary of your AI evaluated interview performance.
          </h3>
          <p>
  {interviewData.role} • {interviewData.experience} •{" "}
  {interviewData.difficulty} • {interviewData.interviewType}
</p>
        </div>

        {/* Overall Score */}
        <div className="score-card">

          <div className="score-circle">
            <span>{overallScore}</span>
            <small>/ 100</small>
          </div>

          <h2>Overall AI Score</h2>

          <p>
            You answered {answeredQuestions} out of{" "}
            {totalQuestions} questions.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="result-summary">

          <div className="summary-card">
            <h3>AI Score</h3>
            <strong>{overallScore}%</strong>
          </div>

          <div className="summary-card">
            <h3>Questions Answered</h3>
            <strong>
              {answeredQuestions}/{totalQuestions}
            </strong>
          </div>

          <div className="summary-card">
            <h3>Interview Status</h3>
            <strong>Completed</strong>
          </div>

        </div>

        {/* AI Evaluation */}
        <div className="ai-results ai-evaluation-section">

          <h2>🤖 AI Evaluation</h2>

          {answers.map((item, index) => {

            const evaluationText =
              item.evaluation?.evaluation || "";

            const questionScore = extractScore(evaluationText);

            const feedback = getSection(
              evaluationText,
              "Feedback",
              ["Strengths", "Improvements"]
            );

            const strengths = getSection(
              evaluationText,
              "Strengths",
              ["Improvements"]
            );

            const improvements = getSection(
              evaluationText,
              "Improvements"
            );

            return (
              <div className="ai-evaluation-card" key={index}>

                <div className="ai-evaluation-card-header">

                  <div className="ai-question-number">
                   Question {index + 1}
                  </div>

                  <span className="ai-score">
  {questionScore}/10
</span>

                </div>

                <h3 className="ai-question">
  {item.question}
</h3>

                <div className="ai-answer-box">
  <h4>Your Answer</h4>
  <p>{item.answer}</p>
</div>

                <div className="ai-feedback-box">
  <h4>💬 Feedback</h4>
  <p>{feedback}</p>
</div>

                <div className="ai-strength-box">
  <h4>✅ Strengths</h4>
  <p>{strengths}</p>
</div>

                <div className="ai-improvement-box">
  <h4>🔧 Improvements</h4>
  <p>{improvements}</p>
</div>

              </div>
            );
          })}

        </div>

        {/* Buttons */}
        <div className="result-buttons">

          <button
            onClick={() => navigate("/")}
            className="secondary-button"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate("/setup")}
            className="primary-button"
          >
            Practice Again →
          </button>

        </div>

      </div>
    </div>
  );
}

export default Result;