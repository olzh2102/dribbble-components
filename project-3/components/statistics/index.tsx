import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

import useDaytimeBackground from '@hooks/use-daytime-background';
import { DAYTIME_BG_COLORS } from '@common/constants';

import CurrentCity from './city-current-weather';
import { Wrapper } from './styled';

const HumidityChart = dynamic(() => import('./humidity-chart'), { ssr: false });
const TemperatureChart = dynamic(() => import('./temperature-chart'), {
  ssr: false,
});

const Statistics = ({ data, cityName }: any) => {
  const daytime = useDaytimeBackground(data.timezone_offset / 3600);

  return (
    <Wrapper borderColor={DAYTIME_BG_COLORS[daytime]}>
      <CurrentCity
        daytime={daytime}
        cityName={cityName}
        current={data?.current}
      />

      <Typography sx={{ textAlign: 'left' }} variant="body2" component="div">
        HOURLY STATISTICS:
      </Typography>

      <HumidityChart data={data} />
      <TemperatureChart data={data} />
    </Wrapper>
  );
};

export default Statistics;
