import styles from '../styles/components/MiniSpinner.module.css';

function MiniSpinner({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <div className={styles.container}>
      <div
        style={{ width: `${size}px` }}
        className={`${styles.loader} ${styles[color]}`}
      ></div>
    </div>
  );
}

export default MiniSpinner;
