// src/services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Send HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to redirect on 401 only for protected API calls
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthExpired = error.response?.status === 401;
    const isAlreadyOnSessionPage = window.location.pathname === '/session-expired';

    // Only redirect if you're not already on the session-expired page
    if (isAuthExpired && !isAlreadyOnSessionPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;