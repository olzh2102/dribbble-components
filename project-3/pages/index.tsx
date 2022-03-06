import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import useFetchWeather from '@hooks/use-fetch-weather';
import { onSave } from 'store/weatherSlice';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const { data, isSuccess } = useFetchWeather('Astana', [
    'daily',
    'minutely',
    'alerts',
  ]);

  if (isSuccess) {
    const { lat, lon } = data as { lat: number; lon: number };
    console.log(data);
    dispatch(onSave({ cityName: 'Astana', lat, lon }));
  }

  return (
    <div>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-testid="home">
        <Box sx={{ width: 300, height: 150, backgroundColor: 'primary.dark' }}>
          here will be weather app!
        </Box>
      </main>
    </div>
  );
};

export default Home;
