/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import useFetchWeather from '@hooks/use-fetch-weather';
import { onSave } from 'store/weatherSlice';

import App from '../components'

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
        <Box
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
          `}
        >
          <App />
        </Box>
      </main>
    </div>
  );
};

export default Home;
