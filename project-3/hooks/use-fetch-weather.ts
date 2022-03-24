import { QueryOptions, useQuery } from 'react-query';
import {
  QUERY_KEY_WEATHER,
  CURRENT_WEATHER_URL,
  ONECALL_WEATHER_URL,
  WEATHER_API_KEY,
} from '@common/constants';
import { TCurrentWeather } from '@common/types';
import { getData } from '@common/utils';

const useFetchWeather = (
  city: string,
  excludes: TExclude[],
  units: TUnits = 'metric',
  options: QueryOptions = {}
) => {
  const res = useQuery(
    [QUERY_KEY_WEATHER, city, excludes, units],
    async () => {
      const { coord } = await getData<TCurrentWeather>(CURRENT_WEATHER_URL, {
        q: city,
        appid: WEATHER_API_KEY,
      });

      const data = await getData(ONECALL_WEATHER_URL, {
        ...coord,
        exclude: excludes.join(','),
        units,
        appid: WEATHER_API_KEY,
      });

      return data;
    },
    options
  );

  return res;
};

export default useFetchWeather;

type TExclude = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type TUnits = 'standard' | 'metric' | 'imperial';
