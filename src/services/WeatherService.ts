import { AxiosResponse } from 'axios';
import { Weather } from '../types/Types';
import api from '../axios';

export class WeatherService {
  static getTodayWeatherByCity(city: string): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`weather?q=${city}`);
  }
  static getTodayWeatherByCoords(
    latitude: string,
    longitude: string
  ): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`weather?lat=${latitude}&lon=${longitude}`);
  }
}
