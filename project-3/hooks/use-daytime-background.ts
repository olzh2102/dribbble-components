import { useEffect, useState } from 'react';
import { getDaytimeName } from '@common/utils';

const useDaytimeBackground = (offsetHours: number) => {
  const hr = new Date().getHours();
  const [daytime, setDaytime] = useState<
    'night' | 'evening' | 'morning' | 'early morning' | 'afternoon'
  >(getDaytimeName(hr + offsetHours - 2));

  useEffect(() => {
    setDaytime(getDaytimeName(hr + offsetHours - 2));
  }, [offsetHours]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaytime(getDaytimeName(hr));
    }, 12 * 10 ** 5);

    return () => clearInterval(interval);
  }, []);

  return daytime;
};

export default useDaytimeBackground;
