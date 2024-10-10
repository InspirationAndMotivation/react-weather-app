import { AxiosResponse } from 'axios';
import { Weather } from '../types/Types';
import weatherApi from '../axios/weatherApi';

export class WeatherService {
  static getTodayWeatherByCity(city: string): Promise<AxiosResponse<Weather>> {
    return weatherApi.get<Weather>(`weather?q=${city}`);
  }
  static getTodayWeatherByCoords(
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse<Weather>> {
    return weatherApi.get<Weather>(`weather?lat=${latitude}&lon=${longitude}`);
  }
  static getWeatherForFewHoursByCoords(
    latitude: number,
    longitude: number,
    cnt: number
  ): Promise<AxiosResponse<Weather>> {
    return weatherApi.get<Weather>(
      `weather?lat=${latitude}&lon=${longitude}&cnt=${cnt}`
    );
  }
}
