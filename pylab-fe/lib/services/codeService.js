/**
 * Service for executing Python code using the Piston API
 */

import axios from 'axios';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

/**
 * Execute Python code
 * @param {string} code - Python code to execute
 * @returns {Promise} - Promise with the execution result
 */
export const executeCode = async (code) => {
  try {
    const response = await apiClient.post('/execute', {
      language: 'python',
      version: '3.10',
      files: [
        {
          content: code
        }
      ],
      stdin: '',
      args: []
    });
    
    // Axios automatically throws for error status codes
    // and parses JSON responses
    const data = response.data;
    
    if (data.run && data.run.stderr) {
      // If there's stderr output, it's an error (syntax error, exception, etc.)
      return {
        success: false,
        error: data.run.stderr
      };
    }
    
    return {
      success: true,
      data: { output: data.run ? data.run.stdout : 'No output' }
    };
  } catch (error) {
    console.error('Error executing code:', error);
    
    // Handle Axios error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return { 
        success: false, 
        error: error.response.data.message || 'Server error: ' + error.response.status
      };
    } else if (error.request) {
      // The request was made but no response was received
      return { 
        success: false, 
        error: 'No response from server. Please check your internet connection.'
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { 
        success: false, 
        error: error.message || 'Failed to connect to the execution service' 
      };
    }
  }
}; 