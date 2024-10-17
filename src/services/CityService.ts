import { AxiosResponse } from 'axios';
import geoApi from '../axios/geoApi';
import { CityData } from '../types/Types';

//TODO: Check if link is correct
export class CityService {
  static getCities(city: string): Promise<AxiosResponse<CityData[]>> {
    return geoApi.get<CityData[]>(
      `cities?minPopulation=10000&namePrefix=${city}`
    );
  }
}
