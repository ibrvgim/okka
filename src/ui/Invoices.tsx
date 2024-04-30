import styles from '../styles/ui/Invoices.module.css';
import { LuPlusCircle } from 'react-icons/lu';
import InvoiceItem from './InvoiceItem';
import InvoiceHeading from './InvoiceHeading';
import { useToggleWindow } from '../contexts/FormWindowContext';
import EmptyInvoices from './EmptyInvoices';
import Button from '../components/Button';
import { Context, InvoiceItems, PriceItems } from '../types/types';
import useGetUser from '../hooks/user/useGetUser';
import { useEffect, useState } from 'react';
import { useCreateInvoice } from '../hooks/invoices/useCreateInvoice';
import useGetInvoice from '../hooks/invoices/useGetInvoice';
import MiniSpinner from '../components/MiniSpinner';

interface Item {
  id: string;
  createdAt: string;
  clientName: string;
  status: string;
  paymentTerms: number;
  itemList: PriceItems[];
}

function Invoices() {
  const { handleToggle, handleClose, handleMiniMenuClose }: Context =
    useToggleWindow();
  const { isLoading, getInvoice } = useGetInvoice();
  const { user } = useGetUser();
  const [filter, setFilter] = useState('all');

  let userInvoices;

  if (filter === 'all')
    userInvoices = getInvoice?.find(
      (invoice) => invoice.user_id === user?.id
    )?.user_invoices;
  else
    userInvoices = getInvoice
      ?.find((invoice) => invoice.user_id === user?.id)
      ?.user_invoices.filter(
        (invoice: InvoiceItems) => invoice.status === filter
      );

  const { setInvoice } = useCreateInvoice();

  useEffect(() => {
    if (!user) return;
    const { id } = user;

    setInvoice({ id });
  }, [user, setInvoice]);

  if (!user) return;
  const { firstName, lastName } = user.user_metadata;

  function handleWindows() {
    handleClose?.();
    handleMiniMenuClose?.();
  }

  if (isLoading) return <MiniSpinner color='wht' size={40} />;

  if (!userInvoices) {
    location.reload();
    return <></>;
  }

  return (
    <div className={styles.container} onClick={() => handleWindows()}>
      <div className={styles.header}>
        <p className={styles.welcome}>
          Welcome, {firstName} {lastName}!
        </p>

        <div>
          <div className={styles.heading}>
            <h1>Invoices</h1>
            {userInvoices.length >= 1 && (
              <p>
                <span>{userInvoices.length}</span> total invoice(s).
              </p>
            )}
          </div>

          <div className={styles.extraFeatures}>
            <select
              className={styles.select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilter(e.target.value)
              }
              disabled={userInvoices.length === 0 && filter === 'all'}
            >
              <option className={styles.hidden}>Filter by status</option>
              <option
                className={`${filter === 'all' ? styles.hidden : ''}`}
                value='all'
              >
                All
              </option>
              <option
                className={`${filter === 'draft' ? styles.hidden : ''}`}
                value='draft'
              >
                Draft
              </option>
              <option
                className={`${filter === 'pending' ? styles.hidden : ''}`}
                value='pending'
              >
                Pending
              </option>
              <option
                className={`${filter === 'paid' ? styles.hidden : ''}`}
                value='paid'
              >
                Paid
              </option>
            </select>

            <Button role='primary' handleOnClick={handleToggle}>
              <>
                <span>
                  <LuPlusCircle />
                </span>
                New Invoice
              </>
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          <MiniSpinner color='wht' size={40} />
        </div>
      ) : userInvoices.length ? (
        <div className={styles.invoicesList}>
          <InvoiceHeading />
          {userInvoices.map((invoice: Item) => (
            <InvoiceItem
              key={invoice.id}
              id={invoice.id}
              date={invoice.createdAt}
              clientName={invoice.clientName}
              status={invoice.status}
              term={invoice.paymentTerms}
              itemList={invoice.itemList}
            />
          ))}
        </div>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
}

export default Invoices;
