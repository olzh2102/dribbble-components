import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Card, CardContent, Typography, Box } from '@mui/material';

import useDaytimeBackground from '@hooks/use-daytime-background';
import { DAYTIME_BG_COLORS, DAYTIME_FONT_COLORS } from '@common/constants';

const HumidityChart = dynamic(() => import('./humidity-chart'), { ssr: false });
const TemperatureChart = dynamic(() => import('./temperature-chart'), {
  ssr: false,
});

const Statistics = ({ data, cityName }: any) => {
  const daytime = useDaytimeBackground();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Card
        variant="outlined"
        sx={{ maxWidth: '200px', backgroundColor: DAYTIME_BG_COLORS[daytime] }}
      >
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography
            sx={{ fontSize: 14, color: DAYTIME_FONT_COLORS[daytime] }}
            color="text.secondary"
            gutterBottom
          >
            {cityName}
          </Typography>

          <Typography
            variant="h5"
            component="div"
            sx={{ color: DAYTIME_FONT_COLORS[daytime] }}
          >
            {data?.current.temp} <span>&#8451;</span>
          </Typography>

          <Image
            width="50"
            height="50"
            src={`http://openweathermap.org/img/wn/${data?.current.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />

          <Typography sx={{ mb: 1.5, color: DAYTIME_FONT_COLORS[daytime] }}>
            {data?.current.weather[0].description}
          </Typography>
          <Typography sx={{ mb: 1.5, color: DAYTIME_FONT_COLORS[daytime] }}>
            feels like: {data?.current.feels_like}
          </Typography>
        </CardContent>
      </Card>

      <Typography sx={{ textAlign: 'left' }} variant="body2" component="div">
        HOURLY STATISTICS:
      </Typography>

      <HumidityChart data={data} />
      <TemperatureChart data={data} />
    </Box>
  );
};

export default Statistics;
