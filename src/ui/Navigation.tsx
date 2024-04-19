import styles from '../styles/ui/Navigation.module.css';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { Children } from '../types/types';

function Navigation({ children }: Children) {
  return (
    <nav className={styles.navigation}>
      <Logo />

      <div>
        <ThemeToggle />

        {children}
      </div>
    </nav>
  );
}

export default Navigation;
