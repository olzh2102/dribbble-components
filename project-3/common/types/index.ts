export type TCurrentWeather = {
  base: string;
  cod: number;
  dt: number;
  id: number;
  name: string;
  timezone: number;
  visibility: number;
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
};

export type TExclude = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
export type TUnits = 'standard' | 'metric' | 'imperial';
export type TDaytime =
  | 'early morning'
  | 'afternoon'
  | 'morning'
  | 'night'
  | 'evening';
