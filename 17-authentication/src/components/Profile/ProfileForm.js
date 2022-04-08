import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import { API_KEY } from '../Auth/AuthForm';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const password = passwordInputRef.current.value;
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            password: password,
            returnSecureToken: true,
          }),
        }
      );
      // const data = await response.json();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          minLength={7}
          id="new-password"
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
