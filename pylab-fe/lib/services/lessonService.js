import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Fetch all lessons
export const getAllLessons = async () => {
  try {
    const response = await axios.get(`${API_URL}/lesson/all`);
    
    if (response.data) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: "Failed to fetch lessons"
      };
    }
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "An error occurred while fetching lessons"
    };
  }
};

// Fetch a single lesson by ID
export const getLessonById = async (lessonId) => {
  try {
    const response = await axios.get(`${API_URL}/lesson/${lessonId}`);
    
    if (response.data) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: "Failed to fetch lesson"
      };
    }
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "An error occurred while fetching the lesson"
    };
  }
}; 