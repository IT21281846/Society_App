import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactNode;
  requiredRole?: string; // 👈 optional role restriction
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { user, token, loading } = useAuth();

  useEffect(() => {
    // Wait until auth finishes loading
    if (!loading) {
      if (!token) {
        // 🚫 Not logged in → redirect to login
        navigate('/');
      } else if (requiredRole && user?.role !== requiredRole) {
        // 🚫 Logged in but doesn't have permission → redirect to dashboard
        navigate('/Dashboard');
      }
    }
  }, [token, loading, navigate, requiredRole, user]);

  // While restoring session
  if (loading) return null;

  // ✅ Authorized → render child components
  return <>{children}</>;
};

export default ProtectedRoute;
