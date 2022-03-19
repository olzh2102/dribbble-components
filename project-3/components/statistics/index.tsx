import { Card, CardContent, Typography } from '@mui/material';
import WEATHER_DATA_MOCK from './data-mock';

const Statistics = () => {
  return (
    <Card variant="outlined">
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Astana
        </Typography>
        <Typography variant="h5" component="div">
          {WEATHER_DATA_MOCK.current.temp}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {WEATHER_DATA_MOCK.current.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Statistics;
