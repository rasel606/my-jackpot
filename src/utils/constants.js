export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.superbaji.com/api/v1';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',

  PROMOTIONS: '/promotions',
  APPLY_PROMOTION: '/promotions/apply',
  PROMOTION_CATEGORIES: '/promotions/categories',

  WALLET_BALANCE: '/wallet/balance',
  DEPOSIT: '/wallet/deposit',
  WITHDRAW: '/wallet/withdraw',
  TRANSACTION_HISTORY: '/wallet/transactions',

  GAMES: '/games',
  GAME_CATEGORIES: '/games/categories',
  HOT_GAMES: '/games/hot',

  PAYMENT_METHODS: '/payment/methods',
  DEPOSIT_METHODS: '/payment/deposit-methods',

  BANNERS: '/banners',
  ANNOUNCEMENTS: '/announcements'
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};