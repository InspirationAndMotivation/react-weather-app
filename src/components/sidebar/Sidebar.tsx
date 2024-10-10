import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import Search from '../search/Search';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import {
  selectCoords,
  selectTodayWeatherData,
  selectUnits,
} from '../../selectors';
import { fetchToggleUnits } from '../../slices/unitsChangingSlice';
import { Button, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchCoords } from '../../slices/coordsSlice';
import {
  fetchTodayWeatherByCity,
  fetchTodayWeatherByCoords,
} from '../../store/thunks/fetchTodayWeather';

const Sidebar = () => {
  const dispatch = useCustomDispatch();
  const { weather } = useCustomSelector(selectTodayWeatherData);
  const { coords } = useCustomSelector(selectCoords);
  const { mode } = useSelector(selectUnits);
  const isCelsius = mode === 'Celsius';

  const handleOnSearchChange = (searchData: any) => {
    dispatch(fetchTodayWeatherByCity(searchData.label));
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
      isCelsius ? toCelsius(weather.main.temp) : toFahrenheit(weather.main.temp)
    );
  };

  const toCelsius = (temp: number) => {
    // Formula of converting from API's Kelvins to Celsius
    return Math.round(temp - 273.15);
  };

  const toFahrenheit = (temp: number) => {
    // Formula of converting from API's Kelvins to Fahrenheit
    return Math.round(1.8 * (temp - 273.15) + 32);
  };

  const onHandleSwitchChange = () => {
    dispatch(fetchToggleUnits());
  };

  const onHandleSetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(fetchCoords(position));
      });
    }
  };

  useEffect(() => {
    dispatch(fetchTodayWeatherByCoords(coords));
  }, [coords]);

  const getTime = (unixDate: number, unixTimezone: number) => {
    const time = new Date(new Date(unixDate * 1000 - unixTimezone));
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  return (
    <div className="Sidebar">
      <div className="Header">
        <Search onSearchChange={handleOnSearchChange}></Search>
        <div className="TempUnitsSwitch">
          <p>°F</p>
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
            <Button
              className="LocationButton"
              onClick={onHandleSetLocationClick}
            >
              {<NearMeOutlinedIcon></NearMeOutlinedIcon>}
            </Button>
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
