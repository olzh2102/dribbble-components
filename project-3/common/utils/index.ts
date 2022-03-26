import axios, { AxiosRequestConfig } from 'axios';

export const getData = async <T>(
  url: string,
  queryParams: { [key: string]: string | number } = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  const stringifiedQueryParams = Object.entries(queryParams)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  const res = await axios.get(
    stringifiedQueryParams === '' ? url : `${url}?${stringifiedQueryParams}`,
    config
  );
  return res.data;
};
