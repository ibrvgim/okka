import { createContext, useContext, useEffect, useState } from 'react';
import { Children } from '../types/types';

const ThemeModeContext = createContext({});

function ThemeModeProvider({ children }: Children) {
  const [theme, setTheme] = useState(false);

  function handleTheme() {
    setTheme((theme) => !theme);
  }

  useEffect(() => {
    theme
      ? document.documentElement.classList.add('light-mode')
      : document.documentElement.classList.remove('light-mode');
  }, [theme]);

  return (
    <ThemeModeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (context === undefined)
    throw new Error('Context located out of provider!');

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeModeProvider, useThemeMode };
