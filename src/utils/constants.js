




// export const APP_CONFIG = {
//   name: "Superbaji",
//   currency: "BDT",
//   language: "বাংলা",
//   country: "BD",
//   supportEmail: "support@superbaji.com",
//   supportPhone: "+880XXXXXXXXX",
//   minDeposit: 100,
//   maxDeposit: 30000,
//   minWithdraw: 500,
//   maxWithdraw: 50000
// };

// export const GAME_CATEGORIES = {
//   HOT: 'hot',
//   SLOTS: 'slots',
//   LIVE: 'live',
//   SPORTS: 'sports',
//   FISHING: 'fishing',
//   P2P: 'p2p',
//   ARCADE: 'arcade',
//   LOTTERY: 'lottery'
// };

// export const PROMOTION_STATUS = {
//   ACTIVE: 'active',
//   UPCOMING: 'upcoming',
//   EXPIRED: 'expired'
// };

// export const PAYMENT_METHODS = {
//   BKASH: 'bkash',
//   NAGAD: 'nagad',
//   ROCKET: 'rocket',
//   UPAY: 'upay',
//   USDT_TRC20: 'trc20',
//   USDT_ERC20: 'erc20'
// };

// export const TRANSACTION_TYPES = {
//   DEPOSIT: 'deposit',
//   WITHDRAW: 'withdraw',
//   BONUS: 'bonus',
//   WAGER: 'wager',
//   WIN: 'win'
// };

// export const TRANSACTION_STATUS = {
//   PENDING: 'pending',
//   COMPLETED: 'completed',
//   FAILED: 'failed',
//   CANCELLED: 'cancelled'
// };

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.superbaji.com/api/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  
  // Promotions
  PROMOTIONS: '/promotions',
  APPLY_PROMOTION: '/promotions/apply',
  PROMOTION_CATEGORIES: '/promotions/categories',
  
  // Wallet
  WALLET_BALANCE: '/wallet/balance',
  DEPOSIT: '/wallet/deposit',
  WITHDRAW: '/wallet/withdraw',
  TRANSACTION_HISTORY: '/wallet/transactions',
  
  // Games
  GAMES: '/games',
  GAME_CATEGORIES: '/games/categories',
  HOT_GAMES: '/games/hot',
  
  // Payment
  PAYMENT_METHODS: '/payment/methods',
  DEPOSIT_METHODS: '/payment/deposit-methods',
  
  // Banner
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