import { RootState } from './store/store';

export const selectTodayWeatherData = (state: RootState) =>
  state.todayWeatherSliceReducer;
