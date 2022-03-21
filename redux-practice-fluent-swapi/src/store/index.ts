import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counter-slice';
import swapiSlice from './swapi-slice';
import { uiReducer } from './ui-slice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    ui: uiReducer,
    swapi: swapiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
