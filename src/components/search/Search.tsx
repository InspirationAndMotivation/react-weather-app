import React, { useEffect, useState } from 'react';
import './Search.scss';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { loadOptions } from '../../loadOptions';
import { fetchTodayWeatherByCoords } from '../../store/thunks/fetchTodayWeather';
import { Coords, Weather } from '../../types/Types';
import { geocode, RequestType, setKey, setLanguage } from 'react-geocode';
import { useSelector } from 'react-redux';
import { selectTodayWeatherData } from '../../selectors';

const Search: React.FC<any> = ({ onSearchChange }) => {
  const [query, setQuery] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState<Coords>({
    latitude: '0',
    longitude: '0',
  });
  const { weather } = useCustomSelector(selectTodayWeatherData);
  const dispatch = useCustomDispatch();

  const handleOnChange = (searchData: any) => {
    setQuery(searchData);
    onSearchChange(searchData);
  };

  useEffect(() => {
    setKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);
    setLanguage('en');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation not supported');
    }
  }, []);

  async function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCoords({ latitude, longitude });
    console.log(coords);
    console.log('Coords were retrieved succesfully');

    try {
      const weather = await dispatch(fetchTodayWeatherByCoords(coords));
      console.log(weather);
      // console.log(weather?.sys?.country);
      // console.log(weatherData);
      // setLocation(weather?.);
    } catch (error) {
      console.error('Something goes wrong. Check this error: ', error);
    }
  }

  function error() {
    console.error('Unable to retrieve your location');
  }

  return (
    <div className="Search">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={query}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
