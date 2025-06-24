import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // ✅ Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthExpired = error.response?.status === 401;
    const isAlreadyOnSessionPage = window.location.pathname === '/session-expired';

    if (isAuthExpired && !isAlreadyOnSessionPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
