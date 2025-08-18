import type { JSX } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/shared/Spinner/Spinner';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
};

const PublicOnlyRoute = ({children}: PrivateRouteProps) => {
  const {isAuthenticated, loading} = useAuthStore();

  if (loading) return <Spinner />;

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicOnlyRoute;