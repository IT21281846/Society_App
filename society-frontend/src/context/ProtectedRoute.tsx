import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      navigate('/'); // redirect only after loading finishes
    }
  }, [token, loading, navigate]);

  // Show nothing while restoring from cookies
  if (loading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
