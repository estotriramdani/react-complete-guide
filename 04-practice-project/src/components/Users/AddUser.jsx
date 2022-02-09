import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';
import { useRef } from 'react';

const AddUser = (props) => {
  const enteredUsername = useRef();
  const enteredAge = useRef();

  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState({
    title: '',
    message: '',
  });

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(enteredAge.current.value);
    console.log(enteredUsername.current.value);
    const data = {
      username: enteredUsername.current.value,
      age: enteredAge.current.value,
    };
    if (data.username.trim().length === 0 || data.age.trim() === 0) {
      setError(true);
      setErrorData({
        title: 'Error!',
        message: 'Please fill all the fields',
      });
      return;
    }
    if (+data.age < 1) {
      setErrorData({
        title: 'Age must be a positive number',
        message: 'Please enter a valid age',
      });
      setError(true);
      return;
    }

    props.addUser(data);
    enteredUsername.current.value = '';
    enteredAge.current.value = '';
  };

  return (
    <>
      {error && (
        <ErrorModal
          onClose={() => setError(false)}
          title={errorData.title}
          message={errorData.message}
        />
      )}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={enteredUsername} />
          <label htmlFor="age">Age (years)</label>
          <input type="text" id="age" ref={enteredAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
