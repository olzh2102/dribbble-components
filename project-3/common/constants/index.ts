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

export const DAYTIME_BG_COLORS = {
  night: '#010206',
  evening: '#180E4B',
  afternoon: '#CE3110',
  morning: '#4DB4D1',
  'early morning': '#E3E6EA',
};

export const DAYTIME_FONT_COLORS = {
  night: '#F5F0F6',
  evening: '#F5F0F6',
  afternoon: '#40434E',
  morning: '#40434E',
  'early morning': '#080705',
};
