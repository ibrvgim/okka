import styles from '../styles/ui/EmptyInvoices.module.css';
import { useToggleWindow } from '../contexts/FormWindowContext';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { Context } from '../types/types';

function EmptyInvoices() {
  const { handleToggle }: Context = useToggleWindow();

  return (
    <div className={styles.container}>
      <div>
        <h1>Let's start managing your invoices!</h1>
        <span onClick={handleToggle}>
          <FaFileCirclePlus />
        </span>
      </div>

      <img src='/images/invoice.svg' alt='invoice-image' draggable={false} />
    </div>
  );
}

export default EmptyInvoices;
