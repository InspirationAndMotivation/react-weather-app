import React, { useEffect, useState } from 'react';
import './Search.scss';
import { AsyncPaginate } from 'react-select-async-paginate';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { loadOptions } from '../../loadOptions';
import {
  fetchTodayWeatherByCoords,
  fetchTodayWeatherByCity,
} from '../../store/thunks/fetchTodayWeather';
import { Coords, Position } from '../../types/Types';
import { setKey, setLanguage } from 'react-geocode';
import { useSelector } from 'react-redux';
import { selectCoords, selectQuery } from '../../selectors';
import { coordsSlice, fetchCoords } from '../../slices/coordsSlice';

const Search: React.FC<any> = ({ onSearchChange }) => {
  const dispatch = useCustomDispatch();
  const { coords } = useCustomSelector(selectCoords);
  // const { query } = useCustomSelector(selectQuery);
  const [query, setQuery] = useState(null);

  const customStyles = {
    option: (provided: any, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3699FF' : null,
      color: state.isFocused ? 'white' : 'black',
    }),
  };

  const handleOnChange = (searchData: React.SetStateAction<any>) => {
    // dispatch(fetchQuery(searchData));
    setQuery(searchData);
    onSearchChange(searchData);
    setQuery(null);
  };

  async function success(position: Position) {
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      if (latitude && longitude) {
        console.log('Coords were retrieved succesfully');
        dispatch(fetchCoords({ coords: { latitude, longitude } }));
      }
    } catch (error) {
      console.error('Something goes wrong. Check this error: ', error);
    }
  }

  async function error() {
    console.error('Unable to retrieve your location');
  }

  useEffect(() => {
    const getInitialData = () => {
      setKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);
      setLanguage('en');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.error('Geolocation not supported');
      }
    };

    getInitialData();
  }, []);

  useEffect(() => {
    dispatch(fetchTodayWeatherByCoords(coords));
  }, [coords]);

  return (
    <div className="Search">
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={query}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default Search;
