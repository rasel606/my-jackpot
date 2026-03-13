import { useState } from 'react';

const API_BASE = 'https://api.png71.live/api/games';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (endpoint, method = 'GET', data = null) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('png71-user')}`,
      },
      };

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
      }

      const url = method === 'GET' && data 
        ? `${API_BASE}${endpoint}?${new URLSearchParams(data)}`
        : `${API_BASE}${endpoint}`;

      const response = await fetch(url, config);
      const result = await response.json();
console.log("result",result);
      if (!response.ok) {
        throw new Error(result.errMsg || 'API request failed');
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    apiCall,
    loading,
    error,
  };
};