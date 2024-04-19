import styles from '../styles/components/StatusIcon.module.css';
import statusStyle from '../data/status';
import { GoDotFill } from 'react-icons/go';

function StatusIcon({ status }: { status: string }) {
  const style = statusStyle.find((item) => item.status === status);

  return (
    <div
      className={styles.status}
      style={{
        color: `${style?.color}`,
        backgroundColor: `${style?.backgroundColor}`,
      }}
    >
      <span>
        <GoDotFill />
      </span>
      <p>{status}</p>
    </div>
  );
}

export default StatusIcon;
