import axios from 'axios';
import { QueryOptions, useQuery, UseQueryResult } from 'react-query';
import { QUERY_KEY_COUNTRIES, URL_COUNTRIES } from '../constants';

const useFetchCountries = (options: QueryOptions = {}): UseQueryResult<any> => {
  const res = useQuery(
    QUERY_KEY_COUNTRIES,
    () => axios.get(URL_COUNTRIES),
    options
  );

  return res;
};

export default useFetchCountries;
