import React from 'react';
import './Widget.scss';
import ChartCard from '../chartCard/ChartCard';
import WeatherInfoCard from '../weatherInfoCard/WeatherInfoCard';

const Widget = () => {
  return (
    <div className="Widget">
      <h3>Welcome to the Weather Service!</h3>
      <p>Check out today's weather information</p>
      <ChartCard></ChartCard>
      <p>More details of today's weather</p>
      <div className="WidgetTable">
        <WeatherInfoCard></WeatherInfoCard>
        <WeatherInfoCard></WeatherInfoCard>
        <WeatherInfoCard></WeatherInfoCard>
        <WeatherInfoCard></WeatherInfoCard>
        <WeatherInfoCard></WeatherInfoCard>
        <WeatherInfoCard></WeatherInfoCard>
      </div>
    </div>
  );
};

export default Widget;
