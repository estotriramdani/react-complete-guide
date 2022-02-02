import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import styles from './AddUser.module.css';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
  const [data, setData] = useState({
    username: '',
    age: '',
  });

  const [error, setError] = useState(false);
  const [errorData, setErrorData] = useState({
    title: '',
    message: '',
  });

  const addUserHandler = (event) => {
    event.preventDefault();
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
    setData((prevState) => {
      return {
        ...prevState,
        username: '',
        age: '',
      };
    });

    props.addUser(data);
  };

  const inputChangeHandler = (event) => {
    setData((prevState) => {
      return {
        ...prevState,
        [event.target.id]: event.target.value,
      };
    });
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
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={inputChangeHandler}
          />
          <label htmlFor="age">Age (years)</label>
          <input
            type="text"
            id="age"
            value={data.age}
            onChange={inputChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
