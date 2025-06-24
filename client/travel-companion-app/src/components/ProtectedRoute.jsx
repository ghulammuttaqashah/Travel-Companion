import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import Spinner from '../components/Spinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { showToast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verify');
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        // If user is not logged in (no cookie), show login-required toast
        if (!hasRedirected && !document.cookie.includes("token")) {
          showToast("error", "Please login first!");
          setHasRedirected(true);
        }
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [hasRedirected, showToast]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;