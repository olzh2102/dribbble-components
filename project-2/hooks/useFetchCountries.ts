import { useQuery } from 'react-query';
import { QUERY_KEY_COUNTRIES } from '../constants';

const useFetchCountries = (url: string, options: any = {}) => {
  const query = useQuery(
    QUERY_KEY_COUNTRIES,
    async () => {
      const response = await fetch(url);
      return response.json();
    },
    options
  );

  return { ...query, status: query.status, countries: query.data?.data };
};

export default useFetchCountries;
