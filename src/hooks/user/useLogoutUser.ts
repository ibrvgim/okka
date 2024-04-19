import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../data/authentication/apiUser';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogoutUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLogingout, mutate: logout } = useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/authentication', { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLogingout, logout };
}
