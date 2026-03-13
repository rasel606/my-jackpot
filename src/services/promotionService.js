import { apiService } from './api';

export const promotionsService = {
  GetPromotions: async (filters = {}) => {
    const response = await apiService.get('/promotions/bonuses', filters);
    console.log('GetPromotions response:', response);
    return response;
  },
};

export default promotionsService;
