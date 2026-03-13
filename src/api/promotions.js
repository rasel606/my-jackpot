import { apiClient } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export const promotionsAPI = {
  // Get all promotions
  async getPromotions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) {
        queryParams.append('category', filters.category);
      }
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      if (filters.limit) {
        queryParams.append('limit', filters.limit);
      }
      if (filters.page) {
        queryParams.append('page', filters.page);
      }

      const endpoint = queryParams.toString() 
        ? `${API_ENDPOINTS.PROMOTIONS}?${queryParams.toString()}`
        : API_ENDPOINTS.PROMOTIONS;

      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get promotion categories
  async getPromotionCategories() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROMOTION_CATEGORIES);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Apply for a promotion
  async applyPromotion(promotionId) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.APPLY_PROMOTION, {
        promotion_id: promotionId
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get promotion details
  async getPromotionDetails(promotionId) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PROMOTIONS}/${promotionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Validate promo code
  async validatePromoCode(promoCode) {
    try {
      const response = await apiClient.post('/promotions/validate-code', {
        promo_code: promoCode
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};