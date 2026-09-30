import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInterviews } from "../Services/interviewAPI";

function History() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();
        setInterviews(data);
      } catch (error) {
        console.error("Failed to load interview history");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="history-page">
        <h2>Loading interview history...</h2>
      </div>
    );
  }

  return (
    <div className="history-page">

      <div className="history-container">

        <div className="history-header">
          <p>INTERVIEW HISTORY</p>

          <h1>
            Your Interview <span>History</span>
          </h1>

          <h3>
            Track your previous interview performances.
          </h3>
        </div>

        {interviews.length === 0 ? (
          <div className="empty-history">
            <h2>No interviews yet</h2>

            <p>
              Complete your first interview to see your
              performance here.
            </p>
          </div>
        ) : (
          <div className="history-list">

            {interviews
              .slice()
              .reverse()
              .map((interview) => (

                <div className="history-card" key={interview.id}>

                  <div className="history-card-top">

                    <div>
                      <h2>{interview.role}</h2>

                      <p>
                        {interview.interviewType} Interview
                      </p>
                    </div>

                    <div className="history-score">
                      {interview.score}%
                    </div>

                  </div>

                  <div className="history-details">

                    <div>
                      <span>Experience</span>
                      <strong>
                        {interview.experience}
                      </strong>
                    </div>

                    <div>
                      <span>Difficulty</span>
                      <strong>
                        {interview.difficulty}
                      </strong>
                    </div>

                    <div>
                      <span>Questions</span>
                      <strong>
                        {interview.answeredQuestions}/
                        {interview.totalQuestions}
                      </strong>
                    </div>

                  </div>

                  <div className="history-date">
                    {new Date(interview.date).toLocaleDateString()}
                  </div>

                  <button
  className="history-view-button"
  onClick={() =>
    navigate("/result", {
      state: {
        answers: interview.answers || [],
        totalQuestions: interview.totalQuestions || 0,
        interviewData: {
          role: interview.role,
          experience: interview.experience,
          difficulty: interview.difficulty,
          interviewType: interview.interviewType,
        },
      },
    })
  }
>
  View Result →
</button>

                </div>

              ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default History;