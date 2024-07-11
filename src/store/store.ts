import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todayWeatherSliceReducer from '../slices/todayWeatherSlice';
import unitsChangingSliceReducer from '../slices/unitsChangingSlice';
import coordsSliceReducer from '../slices/coordsSlice';

const rootReducer = combineReducers({
  todayWeatherSliceReducer,
  unitsChangingSliceReducer,
  coordsSliceReducer,
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
