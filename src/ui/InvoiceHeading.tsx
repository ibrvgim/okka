import styles from '../styles/ui/InvoiceHeading.module.css';

function InvoiceHeading() {
  return (
    <div className={styles.header}>
      <span className={styles.id}>ID</span>
      <span className={styles.due}>Due</span>
      <span className={styles.fullname}>Full Name</span>

      <span className={styles.payment}>Payment</span>
      <span className={styles.status}>Status</span>
    </div>
  );
}

export default InvoiceHeading;
