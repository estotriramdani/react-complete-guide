import { Route } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <section>
      <h1>WelcomePage</h1>
      <Route path="/welcome/new-user">
        <p>Welcome new user!</p>
      </Route>
    </section>
  );
};

export default WelcomePage;
