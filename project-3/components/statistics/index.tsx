import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Statistics = ({ data }: any) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Card variant="outlined">
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Astana
          </Typography>
          <Typography variant="h5" component="div">
            {data?.current.temp}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data?.current.weather[0].description}
          </Typography>
        </CardContent>
      </Card>

      <Typography sx={{ textAlign: 'left' }} variant="body2" component="div">
        HOURLY STATISTICS:
      </Typography>

      <BarChart width={730} height={250} data={data?.hourly}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="humidity" tick={false} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="humidity" fill="#8884d8" />
      </BarChart>
    </Box>
  );
};

export default Statistics;
