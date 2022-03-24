import { useQuery, QueryOptions } from 'react-query';
import { getData } from '@common/utils';
import { CURRENT_WEATHER_URL, WEATHER_API_KEY } from '@common/constants';

const useFetchCoordinates = (
  {
    city,
    excludes,
    units = 'metric',
  }: { city: string; excludes: TExclude[]; units?: TUnits },
  queryOptions?: any
) => {
  return useQuery(
    ['coordinates', { city, excludes, units }],
    () => getData(CURRENT_WEATHER_URL, { q: city, appid: WEATHER_API_KEY }),
    queryOptions
  );
};

export default useFetchCoordinates;

type TExclude = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type TUnits = 'standard' | 'metric' | 'imperial';
