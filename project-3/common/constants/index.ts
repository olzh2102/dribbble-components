// export const WEATHER_API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
export const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
export const CURRENT_WEATHER_URL = `${BASE_WEATHER_URL}/weather`;
export const ONECALL_WEATHER_URL = `${BASE_WEATHER_URL}/onecall`;
export const QUERY_KEY_WEATHER = 'weather';
export const WEATHER_API_KEY = '424b258116dc401184f3ac801fce0559';

export const DAY_SEGMENTS = [
  [22, 'night'],
  [18, 'evening'],
  [12, 'afternoon'],
  [5, 'morning'],
  [0, 'early morning'],
];
