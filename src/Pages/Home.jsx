import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <main className="hero-section">

        <div className="hero-content">

          <p className="hero-tag">
            AI-POWERED INTERVIEW PRACTICE
          </p>

          <h1>
            Practice Interviews.
            <br />
            <span>Build Confidence.</span>
          </h1>

          <p className="hero-description">
            Prepare for your next interview with an AI interviewer.
            Practice role-specific questions and improve your answers
            with instant feedback.
          </p>

          <button
            className="start-button"
            onClick={() => navigate("/setup")}
          >
            Start Your Interview →
          </button>

        </div>

        <div className="hero-card">

          <div className="card-header">
            <div className="status-dot"></div>
            <span>AI Interviewer</span>
          </div>

          <div className="question-preview">

            <p className="small-text">
              Question 01
            </p>

            <h3>
              What is the difference between
              useState and useEffect in React?
            </h3>

            <div className="fake-answer">
              Your answer will appear here...
            </div>

          </div>

          <div className="card-footer">
            <span>Frontend Developer</span>
            <span>Medium</span>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Home;