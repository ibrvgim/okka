import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoice } from '../../data/invoices/apiInvoices';
import toast from 'react-hot-toast';

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  const { isPending: isProcessing, mutate: deleteInvoice } = useMutation({
    mutationFn: updateInvoice,

    onSuccess: () => {
      toast.success('Invoice was successfully deleted!');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isProcessing, deleteInvoice };
}
