import axios, { AxiosRequestConfig } from 'axios';
import { DAY_SEGMENTS } from '@common/constants';

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

export const getDaytimeName = (currentHour: number): string => {
  for (const [hour, name] of DAY_SEGMENTS)
    if (currentHour >= hour) return name as string;

  return '';
};
