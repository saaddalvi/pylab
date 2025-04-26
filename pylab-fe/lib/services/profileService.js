const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Get the student profile
export const getStudentProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Check if response is OK before parsing JSON
    if (!response.ok) {
      // Try to get error message if available
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error;
      } catch (jsonError) {
        // If can't parse JSON, use status text
        errorMessage = response.statusText || 'Failed to fetch profile data';
      }
      throw new Error(errorMessage);
    }
    
    // Only parse JSON when we know response is OK
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching student profile:', error);
    throw error;
  }
};

// Update the student profile (for future implementation)
export const updateStudentProfile = async (token, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/student/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      // Try to get error message if available
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error;
      } catch (jsonError) {
        // If can't parse JSON, use status text
        errorMessage = response.statusText || 'Failed to update profile data';
      }
      throw new Error(errorMessage);
    }
    
    // Only parse JSON when we know response is OK
    return await response.json();
  } catch (error) {
    console.error('Error updating student profile:', error);
    throw error;
  }
};

export async function getProfile(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/student/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Check if response is OK before parsing JSON
    if (!response.ok) {
      // Try to get error message if available
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error;
      } catch (jsonError) {
        // If can't parse JSON, use status text
        errorMessage = response.statusText || 'Failed to fetch profile';
      }
      throw new Error(errorMessage);
    }
    
    // Only parse JSON when we know response is OK
    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
}

export async function getProgress(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/student/progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Check if response is OK before parsing JSON
    if (!response.ok) {
      // Try to get error message if available
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error;
      } catch (jsonError) {
        // If can't parse JSON, use status text
        errorMessage = response.statusText || 'Failed to fetch progress';
      }
      throw new Error(errorMessage);
    }
    
    // Only parse JSON when we know response is OK
    const data = await response.json();
    return data.progress;
  } catch (error) {
    console.error('Progress fetch error:', error);
    throw error;
  }
}