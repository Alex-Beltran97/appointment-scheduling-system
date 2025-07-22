import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, type JSX } from 'react';
import Spinner from '../components/shared/Spinner/Spinner';

interface PrivateRouteProps {
  children: JSX.Element;
};

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const {isAuthenticated, loading, checkSession} = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) return <Spinner />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;