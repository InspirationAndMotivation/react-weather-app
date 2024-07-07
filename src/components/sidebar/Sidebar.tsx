import React, { useState } from 'react';
import './Sidebar.scss';
import Search from '../search/Search';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useCustomSelector } from '../../hooks/store';
import { selectTodayWeatherData } from '../../selectors';
import { Switch } from '@mui/material';

const Sidebar = () => {
  const { weather } = useCustomSelector(selectTodayWeatherData);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleOnSearchChange = (searchData: any) => {
    console.log(searchData);
  };

  const getDate = () => {
    const today = new Date();
    const month = today.toLocaleString('en', {
      month: 'long',
    });
    const date = today.getDate();
    return `${date}th ${month}`;
  };

  const getTemp = () => {
    return Math.round(
      isCelsius ? toCelsius(weather.main.temp) : weather.main.temp
    );
  };
  const toCelsius = (temp: number) => {
    return Math.round(temp - 273.15);
  };
  const onHandleSwitchChange = () => {
    setIsCelsius(!isCelsius);
  };
  const getTime = (unixDate: number, unixTimezone: number) => {
    const time = new Date(new Date(unixDate * 1000 - unixTimezone));
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  return (
    <div className="Sidebar">
      <div className="Header">
        <Search onSearchChange={handleOnSearchChange}></Search>
        <div className="TempUnitsSwitch">
          <p>°K</p>
          <Switch
            checked={isCelsius}
            onChange={onHandleSwitchChange}
            name="TempUnits"
            className="TempUnits"
          />
          <p>°C</p>
        </div>
      </div>
      <div className="LocationData">
        <div className="RowData">
          <div className="RowData">
            <NearMeOutlinedIcon></NearMeOutlinedIcon>
            <p>{`${weather.name}, ${weather.sys.country}`}</p>
          </div>
          <div className="RowData">
            <img
              src="./img/sunrise.png"
              alt="Sunrise Time"
              className="Icon"
            ></img>
            <p className="TimeData">{`${getTime(
              weather.sys.sunrise,
              weather.timezone
            )}`}</p>
          </div>
        </div>
        <div className="RowData">
          <div className="RowData">
            <p>{`Today, ${getDate()}`}</p>
          </div>
          <div className="RowData">
            <img
              src="./img/sunset.png"
              alt="Sunset Time"
              className="Icon"
            ></img>
            <p className="TimeData">{`${getTime(
              weather.sys.sunset,
              weather.timezone
            )}`}</p>
          </div>
        </div>
      </div>
      <div className="WeatherData">
        <p className="TempData">{`${getTemp()}°`}</p>
        <div className="WeatherConditions">
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
          ></img>
          <p>{weather.weather[0].main}</p>
        </div>
      </div>
      <div className="WeatherImage">
        <img src="./img/girl.png" alt="Girl with Umbrella"></img>
      </div>
    </div>
  );
};

export default Sidebar;
