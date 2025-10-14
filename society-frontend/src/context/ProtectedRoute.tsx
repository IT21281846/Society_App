import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useAuth(); // get token from context

  useEffect(() => {
    if (!token) {
      navigate('/'); // redirect if user is logged out
    }
  }, [token, navigate]);

  // Optionally, you can show a loading state while checking
  if (!token) return null; 

  return <>{children}</>;
};

export default ProtectedRoute;
