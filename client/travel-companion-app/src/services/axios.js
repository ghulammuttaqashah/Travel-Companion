import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Backend base URL
  withCredentials: true, // ✅ Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// ❌ No need for token in headers anymore
// axiosInstance.interceptors.request.use(...) is removed

export default axiosInstance;