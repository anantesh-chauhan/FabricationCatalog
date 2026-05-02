import axios from 'axios';

// ============================================
// Centralized Axios API Client
// Pappu Iron Works - Best Practices
// ============================================

// Base URL configuration
// In production, use relative /api (served by same backend)
// For local dev, use VITE_API_URL from .env or default to localhost
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// Request Interceptor
// Adds auth token to all authenticated requests
// ============================================
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage or auth context
    const token = localStorage.getItem('token');
    
    if (token) {
      // Use x-auth-token header as required by backend middleware
      config.headers['x-auth-token'] = token;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// Response Interceptor
// Global error handling
// ============================================
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.error('Unauthorized: Token expired or invalid');
          // Optionally redirect to login
          // Remove token from localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          break;
        case 403:
          console.error('Forbidden: Access denied');
          break;
        case 404:
          console.error('Not found: Resource does not exist');
          break;
        case 500:
          console.error('Server error: Internal server error');
          break;
        default:
          console.error(`Error ${status}:`, data?.message || 'Unknown error');
      }
      
      return Promise.reject(error);
    } else if (error.request) {
      // Request made but no response (network error)
      console.error('Network error: No response from server');
      return Promise.reject(new Error('Connection error. Please check your internet connection.'));
    } else {
      // Error in setting up request
      console.error('Request error:', error.message);
      return Promise.reject(error);
    }
  }
);

// ============================================
// API Helper Functions
// ============================================

// GET request
export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

// POST request
export const post = async (url, data, options = {}) => {
  const response = await api.post(url, data, options);
  return response.data;
};

// PUT request
export const put = async (url, data, options = {}) => {
  const response = await api.put(url, data, options);
  return response.data;
};

// DELETE request
export const del = async (url, options = {}) => {
  const response = await api.delete(url, options);
  return response.data;
};

// POST with multipart/form-data (for file uploads)
export const postFormData = async (url, formData, token) => {
  const response = await api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;
