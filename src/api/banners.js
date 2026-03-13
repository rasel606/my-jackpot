import api from './index.js';

export const bannerAPI = {
  getBanners: () => api.get('/api/banners'), // Public endpoint for frontend
};

export default bannerAPI;

