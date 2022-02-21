import React, { forwardRef } from 'react';

import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} value={props.input.value} {...props.input} />
    </div>
  );
});

export default Input;
