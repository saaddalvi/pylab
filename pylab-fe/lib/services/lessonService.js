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

// Create a new lesson
export const createLesson = async (lessonData, token) => {
  try {
    const response = await axios.post(`${API_URL}/lesson/create`, lessonData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: "Failed to create lesson"
      };
    }
  } catch (error) {
    console.error("Error creating lesson:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "An error occurred while creating the lesson"
    };
  }
};

// Update an existing lesson
export const updateLesson = async (lessonId, lessonData, token) => {
  try {
    const response = await axios.put(`${API_URL}/lesson/update/${lessonId}`, lessonData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: "Failed to update lesson"
      };
    }
  } catch (error) {
    console.error("Error updating lesson:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "An error occurred while updating the lesson"
    };
  }
};

// Delete a lesson
export const deleteLesson = async (lessonId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/lesson/delete/${lessonId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: "Failed to delete lesson"
      };
    }
  } catch (error) {
    console.error(`Error deleting lesson ${lessonId}:`, error);
    return {
      success: false,
      error: error.response?.data?.error || error.message || "An error occurred while deleting the lesson"
    };
  }
};