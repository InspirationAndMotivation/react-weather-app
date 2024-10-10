import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { CityData, Response } from '../types/Types';

type CitiesList = {
  cities: CityData[];
  response: Response;
};

const initialState: CitiesList = {
  cities: [],
  response: {
    status: 0,
    message: '',
  },
};

export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    fetchCities() {},
    fetchCitiesSuccess(
      state,
      action: PayloadAction<AxiosResponse<CityData[]>>
    ) {
      state.cities = action.payload.data;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchCitiesError(state, action: PayloadAction<AxiosResponse<CityData[]>>) {
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export const { fetchCities, fetchCitiesSuccess, fetchCitiesError } =
  citySlice.actions;
export default citySlice.reducer;
