import { useQuery } from 'react-query';
import { QUERY_KEY_COUNTRIES, URL_COUNTRIES } from '../constants';

const useFetchCountries = (options: any = {}) => {
  const query = useQuery(
    QUERY_KEY_COUNTRIES,
    async () => {
      return await fetch(URL_COUNTRIES).then((res) => res.json())
    },
    options
  );

  return { 
    ...query, 
    status: query.status, 
    countries: query.data?.data 
  };
};

export default useFetchCountries;
