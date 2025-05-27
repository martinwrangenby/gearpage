import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Spinner from '../../components/UI/Spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner/>;

  return user ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
