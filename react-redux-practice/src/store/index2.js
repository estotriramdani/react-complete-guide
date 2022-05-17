import { createStore } from 'redux';

export const ACTION_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  DEC_VALUE: 'DEC_VALUE',
};

export const reducer = (state = { count: 0 }, action) => {
  if (action.type === ACTION_TYPES.INCREMENT) {
    return {
      count: state.count + 1,
    };
  }
  if (action.type === ACTION_TYPES.DECREMENT) {
    return {
      count: state.count - 1,
    };
  }
  if (action.type === ACTION_TYPES.DEC_VALUE) {
    return {
      count: state.count - action.payload.value,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
