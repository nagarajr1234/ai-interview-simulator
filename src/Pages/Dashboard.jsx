import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInterviews } from "../Services/interviewAPI";

function Dashboard() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data);
      } catch (error) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Total interviews
  const totalInterviews = interviews.length;

  // Average score
  const averageScore =
    totalInterviews > 0
      ? Math.round(
          interviews.reduce(
            (total, interview) =>
              total + Number(interview.score || 0),
            0
          ) / totalInterviews
        )
      : 0;

  // Highest score
  const bestScore =
    totalInterviews > 0
      ? Math.max(
          ...interviews.map(
            (interview) => Number(interview.score || 0)
          )
        )
      : 0;

  // Recent interview
  const recentInterview = [...interviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  if (loading) {
    return (
      <div className="dashboard-page">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <p>PERFORMANCE OVERVIEW</p>

          <h1>
            Your <span>Dashboard</span>
          </h1>

          <h3>
            Track your interview practice and progress.
          </h3>
        </div>

        {/* Statistics Cards */}

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">
            <p>Total Interviews</p>
            <h2>{totalInterviews}</h2>
            <span>Completed sessions</span>
          </div>

          <div className="dashboard-stat-card">
            <p>Average AI Score</p>
            <h2>{averageScore}%</h2>
            <span>Based on AI evaluation</span>
          </div>

          <div className="dashboard-stat-card">
            <p>Best AI Score</p>
            <h2>{bestScore}%</h2>
            <span>Highest AI evaluated score</span>
          </div>

        </div>

        {/* Recent Interview */}

        <div className="dashboard-section">

          <div className="dashboard-section-heading">
            <h2>Recent Interview</h2>

            <button onClick={() => navigate("/history")}>
              View History →
            </button>
          </div>

          {recentInterview ? (
            <div className="dashboard-recent-card">

              <div>
                <p>LAST COMPLETED INTERVIEW</p>
                <h2>{recentInterview.role}</h2>

                <span>
                  {recentInterview.difficulty} •{" "}
                  {recentInterview.interviewType}
                </span>
              </div>

              <div className="dashboard-recent-score">
                {Number(recentInterview.score || 0)}%
              </div>

            </div>
          ) : (
            <div className="dashboard-empty">
              <p>No interviews completed yet.</p>
            </div>
          )}

        </div>

        {/* Progress */}

        <div className="dashboard-section">

          <h2>Interview Progress</h2>

          <div className="dashboard-progress-card">

            {interviews.length === 0 ? (
              <p>No progress data available yet.</p>
            ) : (
              [...interviews]
                .sort(
                  (a, b) =>
                    new Date(a.date) - new Date(b.date)
                )
                .map((interview, index) => (
                  <div
                    className="dashboard-progress-item"
                    key={interview.id}
                  >

                    <div className="dashboard-progress-info">
                      <span>Interview {index + 1}</span>
                      <span>{Number(interview.score || 0)}%</span>
                    </div>

                    <div className="dashboard-progress-track">
                      <div
                        className="dashboard-progress-fill"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, Number(interview.score) || 0)
                          )}%`,
                        }}
                      ></div>
                    </div>

                  </div>
                ))
            )}

          </div>

        </div>

        <button
          className="dashboard-start-button"
          onClick={() => navigate("/setup")}
        >
          Start New Interview →
        </button>

      </div>
    </div>
  );
}

export default Dashboard;