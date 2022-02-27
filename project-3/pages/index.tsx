import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        here will be weather app!
      </main>
    </div>
  )
}

export default Home
