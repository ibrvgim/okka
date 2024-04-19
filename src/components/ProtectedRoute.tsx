import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FullPageSpinner from '../pages/FullPageSpinner';
import useGetUser from '../hooks/user/useGetUser';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useGetUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/authentication');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <FullPageSpinner />;
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
