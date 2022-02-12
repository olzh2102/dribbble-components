import axios from 'axios';
import { useQuery } from 'react-query';
import { QUERY_KEY_COUNTRIES, URL_COUNTRIES } from '../constants';

const useFetchCountries = (options: any = {}) => {
  const query = useQuery(
    QUERY_KEY_COUNTRIES,
    async () => {
      const res = await axios.get(URL_COUNTRIES)
      return res.data
    },
    options
  );

  return {
    ...query,
    countries: query.data?.data,
  };
};

export default useFetchCountries;
