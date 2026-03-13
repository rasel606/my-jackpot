import api from './index.js';

export const adsAPI = {
  getAdvertisements: () => api.get('/api/ads'), // Public for frontend carousel
};

export default adsAPI;

