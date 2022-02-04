import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_KEY_COUNTRIES, URL_COUNTRIES } from '../constants';

const useFetchCountries = (options: any = {}) => {
  const query = useQuery(
    QUERY_KEY_COUNTRIES,
    async () => {
      const response = await axios.get(URL_COUNTRIES);
      return response.data;
    },
    options
  );

  return {
    ...query,
    countries: query.data?.data,
  };
};

export default useFetchCountries;
