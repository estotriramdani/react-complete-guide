import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    dec: (state, action) => {
      state.count = state.count - action.payload.value;
    },
    inc: (state, action) => {
      state.count = state.count + action.payload.value;
    },
  },
});

export const counterReducer = counterSlice.reducer;
export const counterActions = counterSlice.actions;

export default counterSlice;
