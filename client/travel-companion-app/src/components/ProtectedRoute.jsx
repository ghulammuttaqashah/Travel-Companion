import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '../components/ToastContext'; // 🔔 Adjust this if your path differs
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { showToast } = useToast();

  const [hasRedirected, setHasRedirected] = useState(false); // ✅ prevent multiple toasts

  useEffect(() => {
    if (!token && !hasRedirected) {
      showToast( "error","Please login first");
      setHasRedirected(true);
    }
  }, [token, hasRedirected, showToast]);

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default ProtectedRoute;