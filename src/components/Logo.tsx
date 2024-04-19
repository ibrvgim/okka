import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/Logo.module.css';

function Logo() {
  const navigate = useNavigate();

  return (
    <div className={styles.logo} onClick={() => navigate('/')}>
      <h1>
        <span>
          <img src='/icons/crescent.png' alt='logo-icon' />
        </span>
        kka
      </h1>
    </div>
  );
}

export default Logo;
