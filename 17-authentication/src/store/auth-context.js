import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const now = new Date();
  const adj = new Date(expirationTime).getTime() - now.getTime();
  return Math.round(adj / 1000);
};

export const AuthContextProvier = (props) => {
  const initialToken = localStorage.getItem('tokenrcg');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('tokenrcg', token);
    const remainingTime = calculateRemainingTime(
      localStorage.getItem('expirationTime')
    );
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('tokenrcg');
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  useEffect(() => {
    setToken(initialToken);
  }, [initialToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
