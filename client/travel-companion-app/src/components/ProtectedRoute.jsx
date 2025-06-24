import { useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios';
import Spinner from '../components/Spinner';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { showToast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/verify');
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        const msg = err.response?.data?.error;

        if (msg === "Invalid token") {
          window.location.href = '/session-expired';
        } else {
          showToast("error", "Please login to continue.");
        }
      } finally {
        setAuthChecked(true); // ✅ Ensures auth check is done
      }
    };

    checkAuth();
  }, [location.pathname, showToast]);

  // ✅ While auth not yet checked, render nothing or spinner
  if (!authChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ✅ If not authenticated, return nothing (stay on current page)
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;