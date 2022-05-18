import { useState } from 'react';
import Output from './Output';

const Greeting = () => {
  const [changeText, setChangeText] = useState(false);

  const changeTextHandler = () => {
    setChangeText(!changeText);
  };

  return (
    <div>
      <h2 title="hello world">Hello World!</h2>
      {changeText ? (
        <Output>Changed!</Output>
      ) : (
        <Output>It's good to see you</Output>
      )}
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  );
};

export default Greeting;
