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
    const path = window.location.pathname;

    const protectedPaths = ['/weather', '/currency-converter', '/expensetracker'];
    const isProtectedRoute = protectedPaths.some(route => path.startsWith(route));

    // Do not redirect on login/register page or non-protected routes
    const isAuthPage = path === '/login' || path === '/register';
    const isAlreadyOnSessionPage = path === '/session-expired';

    if (isAuthExpired && isProtectedRoute && !isAlreadyOnSessionPage && !isAuthPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;