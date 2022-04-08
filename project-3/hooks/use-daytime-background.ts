import { useEffect, useState } from 'react';
import { getDaytimeName } from '@common/utils';

const useDaytimeBackground = () => {
  const hr = new Date().getHours();
  const [daytime, setDaytime] = useState<
    'night' | 'evening' | 'morning' | 'early morning' | 'afternoon'
  >(getDaytimeName(hr));

  useEffect(() => {
    const interval = setInterval(() => {
      setDaytime(getDaytimeName(hr));
    }, 12 * 10 ** 5);

    return () => clearInterval(interval);
  }, []);

  return daytime;
};

export default useDaytimeBackground;
