import { useQuery } from 'react-query';
import { getData } from '@common/utils';
import { CURRENT_WEATHER_URL, WEATHER_API_KEY } from '@common/constants';
import { TExclude, TUnits, TCurrentWeather } from '@common/types';

const useFetchCoordinates = (
  {
    cityName,
    excludes = ['daily', 'minutely', 'alerts'],
    units = 'metric',
  }: { cityName: string; excludes?: TExclude[]; units?: TUnits },
  queryOptions?: any
) => {
  return useQuery<Pick<TCurrentWeather, 'coord'>>(
    ['coordinates', { cityName, excludes, units }],
    () => getData(CURRENT_WEATHER_URL, { q: cityName, appid: WEATHER_API_KEY }),
    queryOptions
  );
};

export default useFetchCoordinates;
