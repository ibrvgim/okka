import styles from '../styles/ui/AuthenticationForms.module.css';
import { CiSquareRemove } from 'react-icons/ci';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useToggleWindow } from '../contexts/FormWindowContext';
import Button from '../components/Button';
import { Context, User } from '../types/types';
import { useForm } from 'react-hook-form';
import useLoginUser from '../hooks/user/useLoginUser';
import MiniSpinner from '../components/MiniSpinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function SigninForm() {
  const { login, handleLogin, handleSignup }: Context = useToggleWindow();
  const { register, handleSubmit, formState } = useForm();
  const { isLogining, setLogin } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const { errors } = formState;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    handleSignup?.();
  }

  function onSubmit(data: User) {
    const { email, password } = data;
    setLogin({ email, password });
  }

  function handlePassword() {
    setShowPassword((show) => !show);
  }

  return (
    <div className={`${styles.container} ${login && styles.open}`}>
      <button className={styles.iconClose} onClick={handleLogin}>
        <CiSquareRemove />
      </button>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in to account</h1>

        <div className={styles.inputsContainer}>
          <div className={styles.email}>
            <label htmlFor='email'>
              E-mail
              {errors?.email?.message && (
                <span>{errors?.email?.message.toString()}</span>
              )}
            </label>

            <div>
              <span className={styles.inputIcon}>
                <MdEmail />
              </span>
              <input
                id='email'
                type='text'
                placeholder='ex. alex.johnson@gmail.com'
                {...register('email', {
                  required: 'This field is required',
                  validate: (value) =>
                    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    'Invalid e-mail address',
                })}
                defaultValue='example@gmail.com'
              />
            </div>
          </div>

          <div className={styles.password}>
            <label htmlFor='password'>
              Password
              {errors?.password?.message && (
                <span>{errors?.password?.message.toString()}</span>
              )}
            </label>

            <div>
              <span className={styles.inputIcon}>
                <RiLockPasswordFill />
              </span>

              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='At least 8 characters'
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'At least 8 characters required',
                  },
                })}
                defaultValue='example1703'
              />

              <span className={styles.eye} onClick={handlePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>

        <p className={styles.alreadyExist}>
          Don't have an account yet?{' '}
          <button onClick={(e) => handleCreate(e)}>Sign up</button>
        </p>

        <div className={styles.button}>
          <Button role='primary' status={isLogining}>
            {isLogining ? <MiniSpinner color='blck' /> : 'Continue'}
          </Button>
        </div>
        <img
          className={styles.loginImage}
          src='/images/login.svg'
          alt='registration form image'
          draggable={false}
        />
      </form>
    </div>
  );
}

export default SigninForm;
