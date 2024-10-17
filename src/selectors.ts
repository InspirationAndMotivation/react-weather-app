import { RootState } from './store/store';

export const selectTodayWeatherData = (state: RootState) =>
  state.todayWeatherSliceReducer;

export const selectCitiesData = (state: RootState) => state.citySliceReducer;

export const selectUnits = (state: RootState) =>
  state.unitsChangingSliceReducer;

export const selectCoords = (state: RootState) => state.coordsSliceReducer;

export const selectQuery = (state: RootState) => state.querySliceReducer;
