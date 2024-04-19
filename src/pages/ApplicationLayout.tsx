import styles from '../styles/pages/ApplicationLayout.module.css';
import { Outlet } from 'react-router-dom';
import InvoiceForm from '../ui/InvoiceForm';
import Navigation from '../ui/Navigation';
import ProfileIcon from '../components/ProfileIcon';

function ApplicationLayout() {
  return (
    <main className={styles.container}>
      <Navigation>
        <ProfileIcon />
      </Navigation>
      <InvoiceForm />
      <Outlet />
    </main>
  );
}

export default ApplicationLayout;
