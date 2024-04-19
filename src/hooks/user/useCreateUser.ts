import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../data/authentication/apiUser';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useToggleWindow } from '../../contexts/FormWindowContext';
import { Context } from '../../types/types';

export function useCreateUser() {
  const navigate = useNavigate();
  const { handleSignupClose }: Context = useToggleWindow();

  const { isPending: isCreating, mutate: createAccount } = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success('Account was created!');
      navigate('/');
      handleSignupClose?.();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isCreating, createAccount };
}
