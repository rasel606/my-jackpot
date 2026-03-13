

// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('png71-user'));

  useEffect(() => {
    // Initialize the auth service with token
    const initAuth = async () => {
      if (token) {
        authService.setToken(token);
        await fetchUserProfile();
      } else {
        setLoading(false);
      }
    };
    
    initAuth();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Don't logout immediately, might be a temporary server issue
      if (error.message.includes('401') || error.message.includes('Token')) {
        logout(); // Only logout on authentication errors
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData, language = 'en') => {
    try {
      setLoading(true);


      const response = await authService.register({userId: formData.userId, password: formData.password, phone: formData.phone, countryCode: formData.countryCode, language});
      
      
      // Handle different response structures
      const newToken = response.token || response.data?.token;
      const userData = response.user || response.data || response;
      
      if (newToken) {
        setToken(newToken);
        localStorage.setItem('png71-user', newToken);
        authService.setToken(newToken);
      }
      
      setUser(userData);
      
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  const login = async (userId, password, language = 'en') => {
    try {
      setLoading(true);
      const response = await authService.login({userId: userId, password, language});
      
      
      // Handle different response structures
      const newToken = response.token || response.data?.token;
      const userData = response.user || response.data || response;
      
      if (newToken) {
        setToken(newToken);
        localStorage.setItem('png71-user', newToken);
        authService.setToken(newToken);
      }
      
      setUser(userData);
      
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('png71-user');
    authService.setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    setUser,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};