export type Response = {
  status: number;
  message: string;
};

export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type CityData = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
};

export type CoordAndNumberOfTimestamps = {
  latitude: number;
  longitude: number;
  cnt: number;
};

export type Coords = {
  latitude: number;
  longitude: number;
};

export type Position = {
  coords: Coords;
};

export type CardData = {
  title: string;
  value: number;
  graphtype: string;
  unitsign: string;
};

export type DescriptionType = {
  descriptionType: string;
  value: number;
};

export type DescriptionData = {
  name: string;
  desc: string;
  min: number;
  max: number;
};
