import styles from '../styles/pages/AuthenticationPage.module.css';
import Button from '../components/Button';
import Navigation from '../ui/Navigation';
import SignupForm from '../ui/SignupForm';
import { useToggleWindow } from '../contexts/FormWindowContext';
import SigninForm from '../ui/SigninForm';
import { Context } from '../types/types';
import useGetUser from '../hooks/user/useGetUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageSpinner from './FullPageSpinner';

function AuthenticationPage() {
  const {
    handleSignup,
    handleSignupClose,
    handleLogin,
    handleLoginClose,
  }: Context = useToggleWindow();

  const { isLoading, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  function handleWindows() {
    handleSignupClose?.();
    handleLoginClose?.();
  }

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [isAuthenticated, navigate]);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className={styles.container}>
      <Navigation>
        <>
          <Button role='secondary' handleOnClick={handleLogin}>
            Log in
          </Button>
          <Button role='primary' handleOnClick={handleSignup}>
            Sign Up
          </Button>
        </>
      </Navigation>

      <SignupForm />
      <SigninForm />

      <div className={styles.intro} onClick={() => handleWindows()}>
        <img
          className={styles.register}
          src='/images/register.svg'
          alt='sign-up image'
          draggable={false}
        />
        <div>
          <h1>
            Manage all your <span>invoices</span> in one place!
          </h1>

          <div className={styles.signup}>
            <Button role='primary' handleOnClick={handleSignup}>
              Sign up
            </Button>
            <div className={styles.loader}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
