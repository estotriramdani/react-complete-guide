import { useDispatch, useSelector } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { ACTION_TYPES } from './store';

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch({ type: ACTION_TYPES.INCREMENT });
  };
  const handleDecrement = () => {
    dispatch({ type: ACTION_TYPES.DECREMENT });
  };
  const handleByValue = () => {
    dispatch({ type: ACTION_TYPES.DEC_VALUE, payload: { value: 9 } });
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
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleByValue}>9</button>
      </header>
    </div>
  );
}

export default App;
