import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../data/authentication/apiUser';

function useGetUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}

export default useGetUser;
