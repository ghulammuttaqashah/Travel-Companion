import { useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import Spinner from '../components/Spinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verify');
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Distinguish between guest and expired session by response message
        const msg = err.response?.data?.error;

        if (msg === "Invalid token") {
          // Session expired (user WAS logged in)
          window.location.href = '/session-expired';
        } else {
          // Guest user trying to access protected route
          showToast("error", "Please login to continue.");
        }

        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location.pathname, showToast]);

  // Show spinner during auth check
  if (isAuthenticated === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // If authenticated, show children. Otherwise, return nothing.
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;