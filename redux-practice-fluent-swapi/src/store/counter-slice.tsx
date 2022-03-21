import { createSlice } from '@reduxjs/toolkit';

export interface ICounterState {
  value: number;
}

const initialState = {
  value: 0,
} as ICounterState;

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const counterActions = counterSlice.actions;

export const counterReducer = counterSlice.reducer;

export default counterSlice;
