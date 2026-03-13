import { apiClient } from './index';
import { API_ENDPOINTS } from '../utils/constants';

export const walletAPI = {
  // Get wallet balance
  async getBalance() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WALLET_BALANCE);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Deposit funds
  async deposit(depositData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DEPOSIT, depositData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Withdraw funds
  async withdraw(withdrawData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WITHDRAW, withdrawData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get transaction history
  async getTransactionHistory(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.type) {
        queryParams.append('type', filters.type);
      }
      if (filters.start_date) {
        queryParams.append('start_date', filters.start_date);
      }
      if (filters.end_date) {
        queryParams.append('end_date', filters.end_date);
      }
      if (filters.limit) {
        queryParams.append('limit', filters.limit);
      }
      if (filters.page) {
        queryParams.append('page', filters.page);
      }

      const endpoint = queryParams.toString() 
        ? `${API_ENDPOINTS.TRANSACTION_HISTORY}?${queryParams.toString()}`
        : API_ENDPOINTS.TRANSACTION_HISTORY;

      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get payment methods
  async getPaymentMethods() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PAYMENT_METHODS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get deposit methods
  async getDepositMethods() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DEPOSIT_METHODS);
      return response;
    } catch (error) {
      throw error;
    }
  }
};