import { createSlice } from '@reduxjs/toolkit';

export interface IUIState {
  isLoading: boolean;
  error: string | null;
}

const initialState = {
  isLoading: false,
  error: null,
} as IUIState;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export default uiSlice;
