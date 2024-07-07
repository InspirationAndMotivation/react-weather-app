import React, { useEffect, useState } from 'react';
import './Search.scss';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { loadOptions } from '../../loadOptions';
import { fetchTodayWeatherByCoords } from '../../store/thunks/fetchTodayWeather';
import { Coords, Position } from '../../types/Types';
import { setKey, setLanguage } from 'react-geocode';
import { selectTodayWeatherData } from '../../selectors';

const Search: React.FC<any> = ({ onSearchChange }) => {
  const [query, setQuery] = useState(null);
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState<Coords>({
    latitude: 35,
    longitude: -80,
  });
  const dispatch = useCustomDispatch();

  const handleOnChange = (searchData: any) => {
    setQuery(searchData);
    onSearchChange(searchData);
  };

  const getInitialData = () => {
    setKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);
    setLanguage('en');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.error('Geolocation not supported');
    }
  };

  async function success(position: Position) {
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (latitude && longitude) {
        console.log('Coords were retrieved succesfully');
        setCoords({ latitude, longitude });
      }
    } catch (error) {
      console.error('Something goes wrong. Check this error: ', error);
    }
  }

  async function error() {
    console.error('Unable to retrieve your location');
  }

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    dispatch(fetchTodayWeatherByCoords(coords));
  }, [coords]);

  // useEffect(() => {
  //   console.log(coords);
  // }, [coords]);

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
