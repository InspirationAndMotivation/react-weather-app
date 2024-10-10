import axios from 'axios';

const geoApi = axios.create({
  baseURL: process.env.REACT_APP_GEO_API_URL,
});

//TODO: Check if link is correct
geoApi.interceptors.request.use((config) => {
  config.url = config.url + '&appid=' + process.env.REACT_APP_GEO_API_KEY;
  return config;
});

export default geoApi;
