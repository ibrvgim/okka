import styles from '../styles/components/ProfileIcon.module.css';
import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import { useToggleWindow } from '../contexts/FormWindowContext';
import { Context } from '../types/types';
import { useLogoutUser } from '../hooks/user/useLogoutUser';

function ProfileIcon() {
  const {
    miniMenu,
    handleMiniMenu,
    handleMiniMenuClose,
    handleClose,
  }: Context = useToggleWindow();
  const { isLogingout, logout } = useLogoutUser();

  function handleCloseWindows() {
    logout();
    handleMiniMenuClose?.();
  }

  return (
    <div className={styles.container} onClick={handleClose}>
      <button className={styles.profile} onClick={handleMiniMenu}>
        <img src='/icons/user.png' alt='user-image' />
      </button>

      <div className={`${styles.miniMenu} ${miniMenu && styles.open}`}>
        <NavLink to='/profile' onClick={handleMiniMenu}>
          <CgProfile /> Profile
        </NavLink>
        <button onClick={() => handleCloseWindows()} disabled={isLogingout}>
          <span>
            <BiLogOutCircle />
          </span>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileIcon;
