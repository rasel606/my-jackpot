// Token management
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

export const setToken = (token) => {
  localStorage.setItem('auth_token', token);
};

export const clearToken = () => {
  localStorage.removeItem('auth_token');
};

// User management
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

// Theme management
export const getTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
};

// Language management
export const getLanguage = () => {
  return localStorage.getItem('language') || 'bn';
};

export const setLanguage = (language) => {
  localStorage.setItem('language', language);
};

// Clear all storage
export const clearAll = () => {
  localStorage.clear();
};