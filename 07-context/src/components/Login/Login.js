import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailStateReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      valid: action.val.includes('@'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      valid: state.value.includes('@'),
    };
  }
  return {
    value: '',
    valid: false,
  };
};

const passwordStateReducer = (state, action) => {
  if (action.type === 'PASSWORD_CHANGE') {
    return {
      value: action.val,
      valid: action.val.trim().length > 6,
    };
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      value: state.value,
      valid: state.value.trim().length > 6,
    };
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const ctx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailStateReducer, {
    value: '',
    valid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordStateReducer, {
    value: '',
    valid: null,
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { valid: emailIsValid } = emailState;
  const { valid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      if (emailIsValid && passwordIsValid) {
        setFormIsValid(true);
      }
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_CHANGE', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
          type="email"
          valid={emailState.valid}
          value={emailState.value}
        />
        <Input
          id="password"
          label="Password"
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
          type="password"
          valid={passwordState.valid}
          value={passwordState.value}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
