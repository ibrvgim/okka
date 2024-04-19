import { InvoiceItems } from '../../types/types';
import supabase from '../supabase';

interface Invoice {
  id: string;
  invoices?: InvoiceItems[];
}

export async function createInvoice({ id }: Invoice) {
  const { data, error } = await supabase
    .from('invoices')
    .insert([{ user_id: id, user_invoices: [] }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateInvoice({ id, invoices }: Invoice) {
  const { data, error } = await supabase
    .from('invoices')
    .update({ user_invoices: invoices })
    .eq('user_id', id)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getInvoices() {
  const { data: invoices, error } = await supabase.from('invoices').select('*');

  if (error) throw new Error(error.message);

  return invoices;
}
