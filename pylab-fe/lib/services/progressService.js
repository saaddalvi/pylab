import { API_URL } from '../utils';

// Get all progress for current user
export async function getAllProgress(token) {
  try {
    const response = await fetch(`${API_URL}/progress`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch progress data' };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Error fetching progress:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// Get progress for a specific lesson
export async function getLessonProgress(lessonId, token) {
  try {
    const response = await fetch(`${API_URL}/progress/${lessonId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch lesson progress' };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// Start or update lesson progress
export async function updateLessonProgress(lessonId, progressData, token) {
  try {
    const response = await fetch(`${API_URL}/progress/${lessonId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(progressData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to update lesson progress' };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Error updating lesson progress:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// Mark lesson as completed
export async function completeLessonProgress(lessonId, scoreData, token) {
  try {
    const response = await fetch(`${API_URL}/progress/${lessonId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to complete lesson' };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Error completing lesson:', error);
    return { success: false, error: 'Network error occurred' };
  }
}

// Get progress statistics
export async function getProgressStats(token) {
  try {
    const response = await fetch(`${API_URL}/progress/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch progress statistics' };
    }
    
    return { success: true, data: data };
  } catch (error) {
    console.error('Error fetching progress statistics:', error);
    return { success: false, error: 'Network error occurred' };
  }
}