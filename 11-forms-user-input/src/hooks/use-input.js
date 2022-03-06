import { useReducer } from 'react';

const initialValues = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: true,
    };
  }
  if (action.type === 'BLUR') {
    return {
      ...state,
      isTouched: true,
    };
  }
  if (action.type === 'RESET') {
    return {
      ...initialValues,
    };
  }
  return initialValues;
};

export default function useInput(validate) {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialValues);

  const valueInputChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const isValid = validate(inputState.value);

  const hasError = !isValid && inputState.isTouched;

  const valueInputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    isValid,
    hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
}
