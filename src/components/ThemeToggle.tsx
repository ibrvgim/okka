import { useThemeMode } from '../contexts/ThemeModeContext';
import styles from '../styles/components/ThemeToggle.module.css';
import { LuSun, LuMoon } from 'react-icons/lu';

interface Theme {
  theme?: boolean;
  handleTheme?: () => void;
}

function ThemeToggle() {
  const { theme, handleTheme }: Theme = useThemeMode();

  return (
    <button className={styles.theme} onClick={handleTheme}>
      {theme ? <LuMoon /> : <LuSun />}
    </button>
  );
}

export default ThemeToggle;
