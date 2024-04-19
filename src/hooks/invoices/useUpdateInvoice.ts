import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoice } from '../../data/invoices/apiInvoices';
import toast from 'react-hot-toast';

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  const { isPending: isProcessing, mutate: updateInvoiceData } = useMutation({
    mutationFn: updateInvoice,

    onSuccess: () => {
      toast.success('Done successfully!');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isProcessing, updateInvoiceData };
}
