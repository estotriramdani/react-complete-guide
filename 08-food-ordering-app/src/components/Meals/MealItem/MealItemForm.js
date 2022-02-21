import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const mealRefs = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = parseInt(mealRefs.current.value);
    if (amount < 1 || amount > 5) {
      setIsValid(false);
      return;
    }
    console.log(amount);
    props.onAddToCart(amount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={mealRefs}
        label="Amount"
        input={{
          type: 'number',
          id: `amount-${Math.random()}`,
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Please enter valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
