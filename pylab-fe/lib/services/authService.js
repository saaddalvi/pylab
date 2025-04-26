// Authentication service for both students and admins
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Student authentication
export async function studentSignIn(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/student/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Error parsing response:', jsonError);
      return {
        success: false,
        error: 'Server response was not valid JSON. Please try again later.',
      };
    }
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to sign in. Please try again.',
      };
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    console.error('Error during student sign in:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function studentSignUp(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/student/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        rollno: formData.rollno,
        email: formData.email,
        password: formData.password,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Error parsing response:', jsonError);
      return {
        success: false,
        error: 'Server response was not valid JSON. Please try again later.',
      };
    }
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to create account. Please try again.',
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error('Error during student sign up:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Admin authentication
export async function adminSignIn(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Error parsing response:', jsonError);
      return {
        success: false,
        error: 'Server response was not valid JSON. Please try again later.',
      };
    }
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to sign in. Please try again.',
      };
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (error) {
    console.error('Error during admin sign in:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function adminSignUp(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Error parsing response:', jsonError);
      return {
        success: false,
        error: 'Server response was not valid JSON. Please try again later.',
      };
    }
    
    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to create account. Please try again.',
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error('Error during admin sign up:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Authentication utility functions
export function isAuthenticated(userType) {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem(`${userType}_token`);
  return !!token;
}

export function getAuthToken(userType) {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem(`${userType}_token`);
}

export function logout(userType) {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(`${userType}_token`);
}