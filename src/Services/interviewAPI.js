const API_URL = "http://localhost:5000/interviews";

export const saveInterview = async (interviewData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to save interview");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving interview:", error);
    throw error;
  }
};

export const getInterviews = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch interviews");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching interviews:", error);
    throw error;
  }
};