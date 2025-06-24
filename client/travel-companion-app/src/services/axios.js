import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ send HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthExpired = error.response?.status === 401;
    const isAlreadyOnSessionPage = window.location.pathname === '/session-expired';
    const hasAuthCookie = document.cookie.includes('token=');

    if (isAuthExpired && hasAuthCookie && !isAlreadyOnSessionPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;