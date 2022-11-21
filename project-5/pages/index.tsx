import { NextPage } from 'next'
import Head from 'next/head'

import ThemeToggler from '~components/theme-toggler'
import RoundedCorner from '~components/rounded-corner'
import LangToggler from '~components/lang-toggler'
import CurrentTime from '~components/current-time'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <div className="flex gap-x-5">
          <CurrentTime />
          <div>
            <LangToggler />
          </div>
          <ThemeToggler />
        </div>
      </RoundedCorner>
    </div>
  )
}

export default Home
