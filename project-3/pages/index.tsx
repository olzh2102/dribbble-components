/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';

import App from '../components';

const Home: NextPage = () => {
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
