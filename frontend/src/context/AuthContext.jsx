import { createContext, useContext, useState, useEffect } from 'react';
import { post } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================
  // Initialize Auth State
  // Check for stored token and user on mount
  // ============================================
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Invalid stored user data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // ============================================
  // Login
  // @desc    Authenticate admin user
  // @route   POST /api/auth/login
  // ============================================
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await post('/auth/login', { username, password });
      
      // Store token and user
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Logout
  // @desc    Clear auth state
  // ============================================
  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // ============================================
  // Clear Error
  // ============================================
  const clearError = () => setError(null);

  // ============================================
  // Context Value
  // ============================================
  const value = {
    // State
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    
    // Actions
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// Custom Hook
// ============================================
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export default AuthContext;
