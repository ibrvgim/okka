import { createContext, useContext, useState } from 'react';
import { Children } from '../types/types';

const FormWindowContext = createContext({});

function FormWindowProvider({ children }: Children) {
  const [toggle, setToggle] = useState(false);
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  const [miniMenu, setMiniMenu] = useState(false);

  function handleToggle() {
    setToggle((toggle) => !toggle);
  }

  function handleClose() {
    if (toggle) setToggle(false);
  }

  function handleSignup() {
    setSignup((signup) => !signup);

    if (login) setLogin(false);
  }

  function handleSignupClose() {
    if (signup) setSignup(false);
  }

  function handleLogin() {
    setLogin((login) => !login);

    if (signup) setSignup(false);
  }

  function handleLoginClose() {
    if (login) setLogin(false);
  }

  function handleMiniMenu() {
    setMiniMenu((menu) => !menu);
  }

  function handleMiniMenuClose() {
    if (miniMenu) setMiniMenu(false);
  }

  return (
    <FormWindowContext.Provider
      value={{
        toggle,
        handleToggle,
        handleClose,
        signup,
        handleSignup,
        handleSignupClose,
        login,
        handleLogin,
        handleLoginClose,
        miniMenu,
        handleMiniMenu,
        handleMiniMenuClose,
      }}
    >
      {children}
    </FormWindowContext.Provider>
  );
}

function useToggleWindow() {
  const context = useContext(FormWindowContext);
  if (context === undefined) throw new Error('Context out of provider!');

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { FormWindowProvider, useToggleWindow };
