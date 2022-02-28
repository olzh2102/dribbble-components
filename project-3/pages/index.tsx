import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
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
