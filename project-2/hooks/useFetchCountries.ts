import { useQuery } from 'react-query';

const useFetchCountries = (url: string) => {
  const { status, data } = useQuery('countries', () =>
    fetch(url).then((res) => res.json())
  );

  const countries = data?.data;

  return { status, countries };
};

export default useFetchCountries;
