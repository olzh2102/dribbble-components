import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { getData } from '@common/utils';
import { GEO_URL, WEATHER_API_KEY } from '@common/constants';
import { TCityGeo } from '@common/types';

const useFetchCityName = (
  { coordinates }: { coordinates: { lat: number; lon: number } },
  queryOptions?: Omit<
    UseQueryOptions<TCityGeo[], unknown, TCityGeo[], QueryKey>,
    'city-name'
  >
) => {
  return useQuery<TCityGeo[]>(
    ['city-name', { coordinates }],
    () => getData(GEO_URL, { ...coordinates, appid: WEATHER_API_KEY }),
    queryOptions
  );
};

export default useFetchCityName;
