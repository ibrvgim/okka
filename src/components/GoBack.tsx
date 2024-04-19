import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/GoBack.module.css';
import { IoIosArrowBack } from 'react-icons/io';

function GoBack() {
  const navigate = useNavigate();

  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <span>
        <IoIosArrowBack />
      </span>
      Go Back
    </button>
  );
}

export default GoBack;
