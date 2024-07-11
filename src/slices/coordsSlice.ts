import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Location = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const initialState: Location = {
  coords: {
    latitude: 35,
    longitude: -80,
  },
};

export const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    fetchCoords: (state, action: PayloadAction<Location>) => {
      state.coords = action.payload.coords;
    },
  },
});

export const { fetchCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
