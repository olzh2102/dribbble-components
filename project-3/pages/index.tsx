import type { NextPage } from 'next'
import Head from 'next/head'
import useFetchWeather from '../hooks/useFetchWeather'
import { Box } from '@mui/material'

const Home: NextPage = () => {
  const { data } = useFetchWeather('Astana', ['daily', 'minutely', 'alerts']);
  console.log(data);

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
  )
}

export default Home
