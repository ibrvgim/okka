import { useMutation } from '@tanstack/react-query';
import { createInvoice } from '../../data/invoices/apiInvoices';

export function useCreateInvoice() {
  const { mutate: setInvoice } = useMutation({
    mutationFn: createInvoice,
  });

  return { setInvoice };
}
