import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Weather } from '../types/Types';

type Response = {
  status: number;
  message: string;
};

type todayWeather = {
  weather: Weather;
  isLoading: boolean;
  response: Response;
};

const initialState: todayWeather = {
  weather: {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: '',
      },
    ],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    rain: {
      '1h': 0,
    },
    clouds: {
      all: 0,
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0,
  },
  isLoading: false,
  response: {
    status: 0,
    message: '',
  },
};

export const todayWeatherSlice = createSlice({
  name: 'today_weather',
  initialState,
  reducers: {
    fetchTodayWeatherByCity(state) {
      state.isLoading = true;
    },
    fetchTodayWeatherByCoords(state) {
      state.isLoading = true;
    },
    fetchTodayWeatherSuccess(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.weather = action.payload.data;
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
    fetchTodayWeatherError(
      state,
      action: PayloadAction<AxiosResponse<Weather>>
    ) {
      state.isLoading = false;
      state.response = {
        status: action.payload.status,
        message: action.payload.statusText,
      };
    },
  },
});

export default todayWeatherSlice.reducer;
