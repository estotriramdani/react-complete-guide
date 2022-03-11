import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0, showToggle: true };

const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    increase: (state, action) => {
      state.value += action.payload;
    },
    toggleCounter: (state) => {
      state.showToggle = !state.showToggle;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
