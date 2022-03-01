import type { NextPage } from 'next'
import Head from 'next/head'
import useFetchWeather from '../hooks/useFetchWeather'

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
        here will be weather app!
      </main>
    </div>
  )
}

export default Home
