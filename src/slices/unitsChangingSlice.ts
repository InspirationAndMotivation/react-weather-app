import { createSlice } from '@reduxjs/toolkit';

type Units = {
  mode: string;
};

const initialState: Units = {
  mode: 'Celsius',
};

export const unitsChangingSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    fetchToggleUnits(state) {
      state.mode = state.mode === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    },
  },
});

export const { fetchToggleUnits } = unitsChangingSlice.actions;
export default unitsChangingSlice.reducer;
