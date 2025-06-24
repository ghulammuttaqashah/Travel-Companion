// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
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
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

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
    <Navigate to="/session-expired" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;