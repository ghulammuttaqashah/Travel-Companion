import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthExpired = error.response?.status === 401;
    const isProtectedRoute = window.location.pathname.startsWith('/weather') ||
                             window.location.pathname.startsWith('/currency-converter') ||
                             window.location.pathname.startsWith('/expensetracker');

    const isAlreadyOnSessionPage = window.location.pathname === '/session-expired';

    // ✅ Redirect only if 401 from a protected route
    if (isAuthExpired && isProtectedRoute && !isAlreadyOnSessionPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;