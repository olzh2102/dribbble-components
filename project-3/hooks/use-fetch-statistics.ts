import { useQuery, QueryOptions } from 'react-query';
import { getData } from '@common/utils';
import { ONECALL_WEATHER_URL, WEATHER_API_KEY } from '@common/constants';

const useFetchStatistics = (
  {
    coordinates,
    excludes,
    units = 'metric',
  }: {
    coordinates: { lat: number; lon: number };
    excludes: TExclude[];
    units: TUnits;
  },
  queryOptions?: QueryOptions
) => {
  return useQuery(
    ['statistics', { coordinates, excludes, units }],
    () =>
      getData(ONECALL_WEATHER_URL, {
        ...coordinates,
        exclude: excludes.join(','),
        units,
        appid: WEATHER_API_KEY,
      }),
    queryOptions
  );
};

export default useFetchStatistics;

type TExclude = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type TUnits = 'standard' | 'metric' | 'imperial';
