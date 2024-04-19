import styles from '../styles/pages/PageNotFound.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProfileIcon from '../components/ProfileIcon';
import Navigation from '../ui/Navigation';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Navigation>
        <ProfileIcon />
      </Navigation>

      <div className={styles.main}>
        <img
          src='/images/not-found.svg'
          alt='not-found-error'
          draggable={false}
        />
        <div>
          <h1>Page not found</h1>
          <Button role='primary' handleOnClick={() => navigate('/')}>
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
