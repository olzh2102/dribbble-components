import { useEffect, useState } from 'react';

import { getDaytimeName } from '@common/utils';
import { TDaytime } from '@common/types';

const useDaytimeBackground = (offsetHours: number) => {
  const hr = new Date().getHours();

  const [daytime, setDaytime] = useState<TDaytime>(
    getDaytimeName(hr + offsetHours - 2)
  );

  useEffect(() => {
    setDaytime(getDaytimeName(hr + offsetHours - 2));
  }, [offsetHours, hr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaytime(getDaytimeName(hr));
    }, 12 * 10 ** 5);

    return () => clearInterval(interval);
  }, []);

  return daytime;
};

export default useDaytimeBackground;
