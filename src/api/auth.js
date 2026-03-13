import { apiClient } from './index';
import { API_ENDPOINTS } from '../utils/constants';
import { setToken, clearToken } from '../utils/storage';

export const authAPI = {
  // Login user
  async login(credentials) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
      
      if (response.data && response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      const response = await apiClient.post(API_ENDPOINTS.LOGOUT);
      clearToken();
      clearUser();
      return response;
    } catch (error) {
      clearToken();
      clearUser();
      throw error;
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN);
      
      if (response.data && response.data.token) {
        setToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      clearToken();
      throw error;
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

// Helper functions for localStorage
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem('user');
};