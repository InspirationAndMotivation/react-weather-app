import { WeatherService } from '../../services/WeatherService';
import { todayWeatherSlice } from '../../slices/todayWeatherSlice';
import { CoordAndNumberOfTimestamps, Coords } from '../../types/Types';
import { AppDispatch } from '../store';

export const fetchTodayWeatherByCity =
  (payload: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(todayWeatherSlice.actions.fetchTodayWeatherByCity());
      const res = await WeatherService.getTodayWeatherByCity(payload);
      if (res.status === 200) {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherSuccess(res));
      } else {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherError(res));
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchTodayWeatherByCoords =
  (payload: Coords) => async (dispatch: AppDispatch) => {
    try {
      dispatch(todayWeatherSlice.actions.fetchTodayWeatherByCoords());
      const res = await WeatherService.getTodayWeatherByCoords(
        payload.latitude,
        payload.longitude
      );
      if (res.status === 200) {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherSuccess(res));
      } else {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherError(res));
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

export const fetchWeatherForFewHoursByCoords =
  (payload: CoordAndNumberOfTimestamps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(todayWeatherSlice.actions.fetchWeatherForFewHoursByCoords());
      const res = await WeatherService.getWeatherForFewHoursByCoords(
        payload.latitude,
        payload.longitude,
        payload.cnt
      );
      if (res.status === 200) {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherSuccess(res));
      } else {
        dispatch(todayWeatherSlice.actions.fetchTodayWeatherError(res));
      }
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
