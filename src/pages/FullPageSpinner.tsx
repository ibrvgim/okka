import styles from '../styles/pages/FullPageSpinner.module.css';

function FullPageSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default FullPageSpinner;
