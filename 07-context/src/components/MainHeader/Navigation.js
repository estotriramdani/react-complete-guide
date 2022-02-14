import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isAuthenticated && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isAuthenticated && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isAuthenticated && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
