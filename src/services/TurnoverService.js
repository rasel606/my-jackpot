// services/TurnoverService.js
import { apiService } from './api';

const turnoverService = {
  // Get active turnover records
  getActiveTurnover: async () => {
    try {
      const response = await apiService.get('/turnover/checkWithdrawalEligibility/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active turnover:', error);
      throw error;
    }
  },

  // Get completed turnover records
  getCompletedTurnover: async () => {
    try {
      const response = await apiService.get('/turnover/checkWithdrawalEligibility/complate');
      return response.data;
    } catch (error) {
      console.error('Error fetching completed turnover:', error);
      throw error;
    }
  },
};

export default turnoverService;