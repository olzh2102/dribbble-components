import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import WeatherSlice from './weatherSlice';

export const store = configureStore({
  reducer: { weather: WeatherSlice },
  middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
