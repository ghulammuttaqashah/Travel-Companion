import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios'; // ✅ Your configured axios with `withCredentials: true`

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { showToast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true/false = result
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verify'); // ✅ Add this route in backend
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
        if (!hasRedirected) {
          showToast("error", "Please login first");
          setHasRedirected(true);
        }
      }
    };

    checkAuth();
  }, [hasRedirected, showToast]);

  // ✅ Wait for auth check to complete
  if (isAuthenticated === null) return null; // or a spinner

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;