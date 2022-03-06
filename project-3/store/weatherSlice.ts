import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  [cityName: string]: {
    lat: number;
    lon: number;
  };
} = {};

const weatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    onSave: (
      state,
      { payload }: PayloadAction<{ cityName: string; lat: number; lon: number }>
    ) => {
      state[payload.cityName] = { lat: payload.lat, lon: payload.lon };
    },
  },
});

export const { onSave } = weatherSlice.actions;
export default weatherSlice.reducer;
