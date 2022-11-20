import { NextPage } from 'next'
import Head from 'next/head'
import ThemeToggler from '~components/theme-toggler'
import RoundedCorner from '~components/rounded-corner'

const Home: NextPage = () => {
  return (
    <div className="bg-white dark:bg-slate-800 h-screen">
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <h1 className="text-3xl font-bold underline text-sky-900 dark:text-blue">
          Hello world!!!!
        </h1>
        <ThemeToggler />
      </RoundedCorner>
    </div>
  )
}

export default Home
