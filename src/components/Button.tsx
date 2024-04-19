import styles from '../styles/components/Button.module.css';

interface Button {
  children: string | JSX.Element;
  role: string;
  handleOnClick?: () => void;
  status?: boolean;
}

function Button({ children, handleOnClick, role, status }: Button) {
  return (
    <button
      className={`${styles.button} ${styles[role]}`}
      onClick={handleOnClick}
      disabled={status}
    >
      {children}
    </button>
  );
}

export default Button;
