import styles from '../styles/ui/InvoiceItem.module.css';
import StatusIcon from '../components/StatusIcon';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { calculateDue } from '../helpers/calculateInvoiceDue';
import { convertCurrency } from '../helpers/currency';
import { PriceItems } from '../types/types';

interface Item {
  id: string;
  date: string;
  clientName: string;
  status: string;
  term: number;
  itemList: PriceItems[];
}

function InvoiceItem({ id, date, clientName, status, term, itemList }: Item) {
  const navigate = useNavigate();

  const totalInvoicePrice = itemList
    ?.map((item: PriceItems) => item.itemQuantity * item.itemPrice)
    .reduce((acc, price) => acc + price, 0);

  return (
    <div className={styles.item} onClick={() => navigate(`/invoice/${id}`)}>
      <p className={styles.id}>{id}</p>
      <p className={styles.due}>{calculateDue(date, term).toUpperCase()}</p>
      <p className={styles.fullname}>{clientName}</p>

      <p className={styles.payment}>{convertCurrency(totalInvoicePrice)}</p>

      <StatusIcon status={status} />

      <span className={styles.iconMore}>
        <IoIosArrowForward />
      </span>
    </div>
  );
}

export default InvoiceItem;
