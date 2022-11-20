import { NextPage } from 'next'
import Head from 'next/head'

import ThemeToggler from '~components/theme-toggler'
import RoundedCorner from '~components/rounded-corner'
import LangToggler from '~components/lang-toggler'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <ThemeToggler />
        <LangToggler />
      </RoundedCorner>
    </div>
  )
}

export default Home
