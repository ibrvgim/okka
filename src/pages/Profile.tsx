import styles from '../styles/pages/Profile.module.css';
import Button from '../components/Button';
import ProfileIcon from '../components/ProfileIcon';
import { useToggleWindow } from '../contexts/FormWindowContext';
import { Context, User } from '../types/types';
import Navigation from '../ui/Navigation';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import useGetUser from '../hooks/user/useGetUser';
import GoBack from '../components/GoBack';
import { useUpdateUser } from '../hooks/user/useUpdateUser';
import { useForm } from 'react-hook-form';
import MiniSpinner from '../components/MiniSpinner';
import { useUpdatePassword } from '../hooks/user/useUpdatePassword';

function Profile() {
  const { handleMiniMenuClose }: Context = useToggleWindow();
  const { user } = useGetUser();
  const { isUpdating, updateUserInfo } = useUpdateUser();
  const { isUpdatingPassword, updateUserPassword } = useUpdatePassword();
  const { register, handleSubmit, getValues, formState } = useForm();

  const { errors } = formState;

  if (!user) return;
  const { firstName, lastName } = user.user_metadata;

  function onSubmitPersonal(data: User) {
    const { firstName, lastName } = data;
    updateUserInfo({ firstName, lastName });
  }

  function onSubmitPassword(data: User) {
    const { password } = data;
    updateUserPassword({ password });
  }

  return (
    <div className={styles.container}>
      <Navigation>
        <ProfileIcon />
      </Navigation>

      <div className={styles.main} onClick={handleMiniMenuClose}>
        <GoBack />
        <div>
          <h1>Personal Information</h1>

          <form
            className={styles.managePersonalInfo}
            onSubmit={handleSubmit(onSubmitPersonal)}
          >
            <h3>Change Information</h3>
            <div className={styles.inputsContainer}>
              <div className={styles.firstName}>
                <label htmlFor='firstName'>
                  First Name
                  {errors?.firstName?.message && (
                    <span>{errors?.firstName?.message.toString()}</span>
                  )}
                </label>

                <div>
                  <span className={styles.inputIcon}>
                    <MdOutlineDriveFileRenameOutline />
                  </span>

                  <input
                    className={styles.error}
                    id='firstName'
                    type='text'
                    placeholder='ex. Alex'
                    defaultValue={firstName}
                    {...register('firstName', {
                      minLength: {
                        value: 2,
                        message: 'Minimum 2 characters',
                      },
                    })}
                  />
                </div>
              </div>

              <div className={styles.firstName}>
                <label htmlFor='lastName'>
                  Last Name
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
                    defaultValue={lastName}
                    {...register('lastName', {
                      minLength: {
                        value: 2,
                        message: 'Minimum 2 characters',
                      },
                    })}
                  />
                </div>
              </div>

              <div className={styles.email}>
                <label htmlFor='email'>E-mail</label>

                <div>
                  <span className={styles.inputIcon}>
                    <MdEmail />
                  </span>

                  <input
                    id='email'
                    type='text'
                    defaultValue={user?.email}
                    disabled
                  />
                </div>
              </div>
            </div>
            <Button role='primary' status={isUpdating}>
              {isUpdating ? <MiniSpinner color='blck' /> : 'Save'}
            </Button>
          </form>

          <form
            className={styles.managePassword}
            onSubmit={handleSubmit(onSubmitPassword)}
          >
            <h3>Change Password</h3>
            <div className={styles.inputsContainer}>
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
                    type='password'
                    placeholder='At least 8 characters'
                    {...register('password', {
                      minLength: {
                        value: 8,
                        message: 'At least 8 characters required',
                      },
                    })}
                  />
                </div>
              </div>

              <div className={styles.confirmPassword}>
                <label htmlFor='confirmPassword'>
                  Confirm Password
                  {errors?.confirmPassword?.message && (
                    <span>{errors?.confirmPassword?.message.toString()}</span>
                  )}
                </label>

                <div>
                  <span className={styles.inputIcon}>
                    <RiLockPasswordFill />
                  </span>

                  <input
                    id='confirmPassword'
                    type='password'
                    placeholder='At least 8 characters'
                    {...register('confirmPassword', {
                      minLength: {
                        value: 8,
                        message: 'At least 8 characters required',
                      },
                      validate: (value) =>
                        value === getValues().password ||
                        'Passwrods are not the same',
                    })}
                  />
                </div>
              </div>
            </div>
            <Button role='primary' status={isUpdating}>
              {isUpdatingPassword ? <MiniSpinner color='blck' /> : 'Save'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
