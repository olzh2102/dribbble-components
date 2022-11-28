import { useContext } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'

import lang from 'common/lang.json'
import { Lang } from 'common/types'

import ThemeToggler from '~components/theme-toggler'
import LangToggler from '~components/lang-toggler'
import RoundedCorner from '~components/rounded-corner'

import { ThemeContext } from '~contexts/theme-provider'
import Wave from '~components/wave'

const CurrentTime = dynamic(() => import('~components/current-time'), {
  ssr: false,
})

const Home: NextPage = () => {
  const locale = useRouter().locale
  const t = lang[locale as Lang]

  const { theme } = useContext(ThemeContext)

  return (
    <div>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>
      <RoundedCorner>
        <div className="absolute top-0 left-0 w-full h-full">
          <Canvas className="rounded-xl" orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
            <Wave />
          </Canvas>
        </div>
        <div className="absolute flex gap-x-5 justify-end px-6">
          <CurrentTime />
          <LangToggler lang={locale as Lang} />
          <ThemeToggler />
        </div>
        <div className="grid h-full place-content-center text-5xl dark:text-white">{t.welcome}</div>
      </RoundedCorner>
    </div>
  )
}

export default Home
