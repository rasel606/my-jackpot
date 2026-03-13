import { apiClient } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export const gamesAPI = {
  // Get all games
  async getGames(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) {
        queryParams.append('category', filters.category);
      }
      if (filters.vendor) {
        queryParams.append('vendor', filters.vendor);
      }
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      if (filters.limit) {
        queryParams.append('limit', filters.limit);
      }
      if (filters.page) {
        queryParams.append('page', filters.page);
      }

      const endpoint = queryParams.toString() 
        ? `${API_ENDPOINTS.GAMES}?${queryParams.toString()}`
        : API_ENDPOINTS.GAMES;

      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get game categories
  async getGameCategories() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GAME_CATEGORIES);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get hot games
  async getHotGames(limit = 10) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.HOT_GAMES}?limit=${limit}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get game details
  async getGameDetails(gameId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.GAMES}/${gameId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Launch game
  async launchGame(gameId) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.GAMES}/${gameId}/launch`);
      return response;
    } catch (error) {
      throw error;
    }
  }
};