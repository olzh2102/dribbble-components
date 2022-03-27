import { useQuery } from 'react-query';
import { getData } from '@common/utils';
import { ONECALL_WEATHER_URL, WEATHER_API_KEY } from '@common/constants';
import { TExclude, TUnits } from '@common/types';

const useFetchStatistics = (
  {
    coordinates,
    excludes = ['daily', 'minutely', 'alerts'],
    units = 'metric',
  }: {
    coordinates?: { lat: number; lon: number };
    excludes?: TExclude[];
    units?: TUnits;
  },
  queryOptions?: any
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
