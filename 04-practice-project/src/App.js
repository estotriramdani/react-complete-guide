import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [users, setUsers] = useState([{ id: 1, username: 'Max', age: 27 }]);
  const addUserHandler = (user) => {
    setUsers((prevUsers) => {
      return [{ id: Math.random(1, 20), ...user }, ...prevUsers];
    });
  };
  return (
    <div>
      <AddUser addUser={addUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
