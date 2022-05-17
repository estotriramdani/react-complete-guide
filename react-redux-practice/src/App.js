import { useDispatch, useSelector } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { counterActions } from './store/counter-slice';

function App() {
  const count = useSelector((state) => state.counter.count);
  console.log(count);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(counterActions.inc({ value: 10 }));
  };
  const handleDecrement = () => {
    dispatch(counterActions.dec({ value: 14 }));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{count}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleDecrement}>-10</button>
        <button onClick={handleIncrement}>+14</button>
      </header>
    </div>
  );
}

export default App;
