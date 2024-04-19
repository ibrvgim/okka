import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../../data/authentication/apiUser';
import { useToggleWindow } from '../../contexts/FormWindowContext';
import { Context } from '../../types/types';

function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleLoginClose }: Context = useToggleWindow();

  const { isPending: isLogining, mutate: setLogin } = useMutation({
    mutationFn: loginUser,

    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user?.user);
      navigate('/', { replace: true });
      handleLoginClose?.();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLogining, setLogin };
}

export default useLoginUser;
