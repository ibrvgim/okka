import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../data/authentication/apiUser';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUserInfo } = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success('Information was updated!');
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateUserInfo };
}
