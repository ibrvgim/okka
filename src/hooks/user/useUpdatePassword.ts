import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword } from '../../data/authentication/apiUser';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingPassword, mutate: updateUserPassword } =
    useMutation({
      mutationFn: updatePassword,

      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success('Information was updated!');
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { isUpdatingPassword, updateUserPassword };
}
