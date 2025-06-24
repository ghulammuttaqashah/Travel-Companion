import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
const PUBLIC_ROUTES = ['/', '/login', '/register', '/session-expired'];

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const isAuthExpired = error.response?.status === 401;
    const currentPath = window.location.pathname;

    const isPublic = PUBLIC_ROUTES.includes(currentPath);
    const isAlreadyOnSessionPage = currentPath === '/session-expired';

    if (isAuthExpired && !isPublic && !isAlreadyOnSessionPage) {
      window.location.href = '/session-expired';
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;