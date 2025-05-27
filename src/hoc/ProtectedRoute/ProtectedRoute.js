import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a Spinner

  return user ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
