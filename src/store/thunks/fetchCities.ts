import { CityService } from '../../services/CityService';
import {
  fetchCities,
  fetchCitiesSuccess,
  fetchCitiesError,
} from '../../slices/citySlice';
import { AppDispatch } from '../store';

export const getCities = (payload: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchCities());
    const res = await CityService.getCities(payload);
    if (res.status === 200) {
      dispatch(fetchCitiesSuccess(res));
    } else {
      dispatch(fetchCitiesError(res));
    }
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
