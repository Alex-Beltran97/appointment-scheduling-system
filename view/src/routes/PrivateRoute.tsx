import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import type { JSX } from 'react';
import Spinner from '../components/shared/Spinner/Spinner';

interface PrivateRouteProps {
  children: JSX.Element;
};

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const {isAuthenticated, loading} = useAuthStore();

  if (loading) return <Spinner />;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;