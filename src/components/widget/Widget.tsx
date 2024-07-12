import React, { useEffect } from 'react';
import './Widget.scss';
import ChartCard from '../chartCard/ChartCard';
import WeatherInfoCard from '../weatherInfoCard/WeatherInfoCard';
import { useCustomSelector } from '../../hooks/store';
import { selectTodayWeatherData } from '../../selectors';

const Widget = () => {
  const { weather } = useCustomSelector(selectTodayWeatherData);

  return (
    <div className="Widget">
      <h3>Welcome to the Weather Service!</h3>
      <p>Check out today's weather information</p>
      <ChartCard></ChartCard>
      <p>More details of today's weather</p>
      <div className="WidgetTable">
        <WeatherInfoCard
          title={'Humidity'}
          value={weather.main.humidity}
          graphtype={'triple'}
          unitsign={'%'}
        ></WeatherInfoCard>
        <WeatherInfoCard
          title={'Wind'}
          value={weather.wind.speed}
          graphtype={'speedometer'}
          unitsign={'m/s'}
        ></WeatherInfoCard>
        <WeatherInfoCard
          title={'Pressure'}
          value={weather.main.pressure}
          graphtype={'multi'}
          unitsign={'hPa'}
        ></WeatherInfoCard>
        <WeatherInfoCard
          title={'Visibility'}
          value={weather.visibility}
          graphtype={'images'}
          unitsign={'m'}
        ></WeatherInfoCard>
        <WeatherInfoCard
          title={'Feels like'}
          value={weather.main.feels_like}
          graphtype={'thermometer'}
          unitsign={'°'}
        ></WeatherInfoCard>
        <WeatherInfoCard
          title={'Cloudiness'}
          value={weather.clouds.all}
          graphtype={'progressbar'}
          unitsign={'%'}
        ></WeatherInfoCard>
      </div>
    </div>
  );
};

export default Widget;
