import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import WEATHER_DATA_MOCK from './data-mock';

const Statistics = () => {
  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 2400, amt: 2400 },
    { name: 'Page E', uv: 280, pv: 2400, amt: 2400 },
    { name: 'Page F', uv: 170, pv: 2400, amt: 2400 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

      <Typography sx={{ textAlign: 'left' }} variant="body2" component="div">
        HOURLY STATISTICS:
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Statistics;
