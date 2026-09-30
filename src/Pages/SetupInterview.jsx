import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateQuestions } from "../Services/aiAPI";

function SetupInterview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Frontend Developer");
  const [experience, setExperience] = useState("Fresher");
  const [difficulty, setDifficulty] = useState("Medium");
  const [interviewType, setInterviewType] = useState("Technical");

  const startInterview = async () => {
  try {
    const result = await generateQuestions(
      role,
      experience,
      difficulty,
      interviewType
    );

    console.log("Generated Questions:", result);

    navigate("/interview", {
      state: {
        role,
        experience,
        difficulty,
        interviewType,
        generatedQuestions: result.questions,
      },
    });
  } catch (error) {
    alert("Could not generate interview questions.");
    console.error(error);
  }
};

  return (
    <div className="setup-page">

      <div className="setup-container">

        <div className="setup-heading">
          <p>INTERVIEW SETUP</p>

          <h1>
            Customize Your
            <span> Interview</span>
          </h1>

          <h3>
            Choose your preferences before starting the interview.
          </h3>
        </div>

        <div className="setup-card">

          {/* Job Role */}

          <div className="form-group">
            <label>Job Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Java Developer</option>
              <option>Python Developer</option>
            </select>
          </div>

          {/* Experience */}

          <div className="form-group">
            <label>Experience Level</label>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option>Fresher</option>
              <option>0 - 1 Year</option>
              <option>1 - 3 Years</option>
              <option>3+ Years</option>
            </select>
          </div>

          {/* Difficulty */}

          <div className="form-group">
            <label>Difficulty</label>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Interview Type */}

          <div className="form-group">
            <label>Interview Type</label>

            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option>Technical</option>
              <option>HR</option>
              <option>Mixed</option>
            </select>
          </div>

          <button
            className="setup-button"
            onClick={startInterview}
          >
            Start Interview →
          </button>

        </div>

      </div>

    </div>
  );
}

export default SetupInterview;