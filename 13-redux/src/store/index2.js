import { createStore } from 'redux';

const counterReducer = (state = { count: 0, showToggle: true }, action) => {
  if (action.type === 'INCREMENT') {
    return {
      count: state.count + 1,
      showToggle: state.showToggle,
    };
  }

  if (action.type === 'INCREASE') {
    return {
      count: state.count + action.amount,
      showToggle: state.showToggle,
    };
  }

  if (action.type === 'DECREMENT') {
    return {
      count: state.count - 1,
      showToggle: state.showToggle,
    };
  }

  if (action.type === 'TOGGLE') {
    return {
      count: state.count,
      showToggle: !state.showToggle,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
