import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Header />
      {!auth.isLoggedIn && <Auth />}
      {auth.isLoggedIn && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
