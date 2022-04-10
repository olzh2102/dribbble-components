import Image from 'next/image';
import { Card, CardContent, Typography } from '@mui/material';

import { DAYTIME_BG_COLORS, DAYTIME_FONT_COLORS } from '@common/constants';
import { TDaytime } from '@common/types';

const CurrentWeather = ({
  daytime,
  cityName,
  current,
}: {
  daytime: TDaytime;
  cityName: string;
  current: any;
}) => {
  const imgSrc = `
    http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png
  `;

  return (
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
          {current.temp} <span>&#8451;</span>
        </Typography>

        <Image width="50" height="50" src={imgSrc} alt="weather-icon" />

        <Typography sx={{ mb: 1.5, color: DAYTIME_FONT_COLORS[daytime] }}>
          {current.weather[0].description}
        </Typography>
        <Typography sx={{ mb: 1.5, color: DAYTIME_FONT_COLORS[daytime] }}>
          feels like: {current.feels_like}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
