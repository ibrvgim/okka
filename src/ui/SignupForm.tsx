import styles from '../styles/ui/AuthenticationForms.module.css';
import { CiSquareRemove } from 'react-icons/ci';
import { MdEmail } from 'react-icons/md';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import Button from '../components/Button';
import { useToggleWindow } from '../contexts/FormWindowContext';
import { Context, User } from '../types/types';
import { useForm } from 'react-hook-form';
import { useCreateUser } from '../hooks/user/useCreateUser';
import MiniSpinner from '../components/MiniSpinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

function SignupForm() {
  const { signup, handleSignup, handleLogin }: Context = useToggleWindow();
  const { register, handleSubmit, formState } = useForm();
  const { isCreating, createAccount } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);

  const { errors } = formState;

  function handleExist(e: React.FormEvent) {
    e.preventDefault();
    handleLogin?.();
  }

  function onSubmit(data: User) {
    const { firstName, lastName, email, password } = data;
    createAccount({ firstName, lastName, email, password });
  }

  function handlePassword() {
    setShowPassword((show) => !show);
  }

  return (
    <div className={`${styles.container} ${signup && styles.open}`}>
      <button className={styles.iconClose} onClick={handleSignup}>
        <CiSquareRemove />
      </button>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Create an Account</h1>

        <div className={styles.inputsContainer}>
          <div className={styles.name}>
            <label htmlFor='firstName'>
              First name
              {errors?.firstName?.message && (
                <span>{errors?.firstName?.message.toString()}</span>
              )}
            </label>

            <div>
              <span className={styles.inputIcon}>
                <MdOutlineDriveFileRenameOutline />
              </span>
              <input
                id='firstName'
                type='text'
                placeholder='ex. Alex'
                {...register('firstName', {
                  required: 'This field is required',

                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters',
                  },
                })}
              />
            </div>
          </div>

          <div className={styles.surname}>
            <label htmlFor='lastName'>
              Last name
              {errors?.lastName?.message && (
                <span>{errors?.lastName?.message.toString()}</span>
              )}
            </label>

            <div>
              <span className={styles.inputIcon}>
                <MdOutlineDriveFileRenameOutline />
              </span>
              <input
                id='lastName'
                type='text'
                placeholder='ex. Johnson'
                {...register('lastName', {
                  required: 'This field is required',

                  minLength: {
                    value: 2,
                    message: 'Minimum 2 characters',
                  },
                })}
              />
            </div>
          </div>

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
              />

              <span className={styles.eye} onClick={handlePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>

        <p className={styles.alreadyExist}>
          Already have an account?{' '}
          <button onClick={(e) => handleExist(e)}>Log in</button>
        </p>

        <div className={styles.button}>
          <Button role='primary' status={isCreating}>
            {isCreating ? <MiniSpinner color='blck' /> : `Create an Account`}
          </Button>
        </div>
        <img
          className={styles.registrationImage}
          src='/images/enter.svg'
          alt='registration form image'
          draggable={false}
        />
      </form>
    </div>
  );
}

export default SignupForm;
