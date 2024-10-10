import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todayWeatherSliceReducer from '../slices/todayWeatherSlice';
import unitsChangingSliceReducer from '../slices/unitsChangingSlice';
import coordsSliceReducer from '../slices/coordsSlice';
import citySliceReducer from '../slices/citySlice';
import querySliceReducer from '../slices/querySlice';

const rootReducer = combineReducers({
  todayWeatherSliceReducer,
  unitsChangingSliceReducer,
  coordsSliceReducer,
  citySliceReducer,
  querySliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
