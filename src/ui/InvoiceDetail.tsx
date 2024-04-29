import styles from '../styles/ui/InvoiceDetail.module.css';
import GoBack from '../components/GoBack';
import StatusIcon from '../components/StatusIcon';
import Button from '../components/Button';
import { convertCurrency } from '../helpers/currency';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUser from '../hooks/user/useGetUser';
import useGetInvoice from '../hooks/invoices/useGetInvoice';
import MiniSpinner from '../components/MiniSpinner';
import { InvoiceItems, PriceItems } from '../types/types';
import { calculateDue } from '../helpers/calculateInvoiceDue';
import { formatDate } from '../helpers/formatDate';
import { useDeleteInvoice } from '../hooks/invoices/useDeleteInvoice';
import { useUpdateInvoice } from '../hooks/invoices/useUpdateInvoice';

// interface Items {
//   itemName: string;
//   itemQuantity: number;
//   itemPrice: number;
// }

function InvoiceDetail() {
  const { user } = useGetUser();
  const { isLoading, getInvoice } = useGetInvoice();
  const { id } = useParams();
  const { deleteInvoice, isProcessing } = useDeleteInvoice();
  const { updateInvoiceData } = useUpdateInvoice();
  const navigate = useNavigate();

  if (!user) return;

  const userInvoices = getInvoice?.find(
    (invoice) => invoice.user_id === user?.id
  )?.user_invoices;

  const invoice = userInvoices?.find(
    (invoice: InvoiceItems) => invoice.id === id
  );

  function handleInvoiceDelete(invoiceID: string) {
    const invoices = userInvoices.filter(
      (invoice: InvoiceItems) => invoice.id !== invoiceID
    );

    const id = user?.id;
    if (!id) return;

    deleteInvoice({
      id,
      invoices,
    });

    if (!isProcessing) return navigate('/');
  }

  function handleInvoiceStatus(invoiceID: string) {
    const changeStatus = userInvoices.find(
      (invoice: InvoiceItems) => invoice.id === invoiceID
    );

    const remaining = userInvoices.filter(
      (invoice: InvoiceItems) => invoice.id !== invoiceID
    );

    const invoices = [{ ...changeStatus, status: 'paid' }, ...remaining];

    const id = user?.id;
    if (!id) return;

    updateInvoiceData({ id, invoices });
  }

  if (isLoading) return <MiniSpinner color='wht' size={40} />;

  const totalInvoicePrice = invoice?.itemList
    .map((items: PriceItems) => items.itemQuantity * items.itemPrice)
    .reduce((acc: number, prices: number) => acc + prices, 0);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.miniNav}>
          <GoBack />

          <div>
            <h3>
              <span>#</span>
              {invoice.id}
            </h3>
            <p>{formatDate(invoice.createdAt)}</p>
          </div>
        </div>

        <div className={styles.header}>
          <StatusIcon status={invoice.status} />

          <div>
            <Button role='edit'>Edit</Button>
            <Button
              role='delete'
              status={isProcessing}
              handleOnClick={() => handleInvoiceDelete(invoice.id)}
            >
              Delete
            </Button>
            {invoice.status === 'pending' && (
              <Button
                role='paid'
                handleOnClick={() => handleInvoiceStatus(invoice.id)}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        <div className={styles.body}>
          <div>
            <p className={styles.description}>
              <span>Description:</span> {invoice.description}
            </p>

            <div className={styles.address}>
              <p>{invoice.senderStreet}</p>
              <p>{invoice.senderCity}</p>
              <p>{invoice.senderPostCode}</p>
              <p>{invoice.senderCountry}</p>
            </div>
          </div>

          <div className={styles.recieverInfo}>
            <div>
              <h5>Bill To</h5>
              <div>
                <h3>{invoice.clientName}</h3>
                <p>{invoice.clientStreet}</p>
                <p>{invoice.clientCity}</p>
                <p>{invoice.clientPostCode}</p>
                <p>{invoice.clientCountry}</p>
              </div>
            </div>

            <div>
              <h5>Sent To</h5>
              <h3>{invoice.clientEmail}</h3>
            </div>

            <div>
              <h5>Payment Due</h5>
              <h3>
                {calculateDue(
                  invoice.createdAt,
                  invoice.paymentTerms
                ).toUpperCase()}
              </h3>
            </div>
          </div>

          {invoice.itemList.length > 0 && (
            <>
              <div className={styles.prices}>
                <div className={styles.heading}>
                  <p className={styles.name}>Item name</p>
                  <p className={styles.quantity}>Quantity</p>
                  <p className={styles.price}>Price</p>
                  <p className={styles.total}>Total</p>
                </div>

                {invoice.itemList.map((items: PriceItems) => (
                  <InvoiceItemsList items={items} key={items.itemName} />
                ))}
              </div>

              <div className={styles.totalAmount}>
                <p>Total amount</p>
                <p>{convertCurrency(totalInvoicePrice)}</p>
              </div>
            </>
          )}

          {!invoice.itemList.length && (
            <div className={styles.emptyPriceList}>
              <p className={styles.emptyListText}>
                No prices are shown on this invoice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InvoiceItemsList({ items }: { items: PriceItems }) {
  const { itemName, itemQuantity, itemPrice } = items;
  const total = itemPrice * itemQuantity;

  return (
    <div className={styles.items}>
      <p className={styles.name}>{itemName}</p>
      <p className={styles.quantity}>{itemQuantity}</p>
      <p className={styles.price}>{convertCurrency(itemPrice)}</p>
      <p className={styles.total}>{convertCurrency(total)}</p>
    </div>
  );
}

export default InvoiceDetail;
