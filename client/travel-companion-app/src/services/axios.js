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
    if (error.response && error.response.status === 401) {
      // 🔁 Redirect to session expired page
      if (window.location.pathname !== '/session-expired') {
        window.location.href = '/session-expired';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;