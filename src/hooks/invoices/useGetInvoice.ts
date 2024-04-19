import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../../data/invoices/apiInvoices';

function useGetInvoice() {
  const { isLoading, data: getInvoice } = useQuery({
    queryKey: ['invoices'],
    queryFn: getInvoices,
  });

  return { isLoading, getInvoice };
}

export default useGetInvoice;
