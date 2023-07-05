import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Noto_Sans_Display } from '@next/font/google'
import { AnimatePresence } from 'framer-motion'

import { PRELOADER_DELAY } from 'common/constants'
import { Page } from 'common/types'
import { Header, RoundedCorner } from '~components/layout'
import Logo from '~components/logo'
import Preloader from '~components/preloader'
import WaveMesh from '~components/wave'
import ThemeCursorProvider from '~contexts/index'

import '../styles/globals.css'

const font = Noto_Sans_Display({ subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'] })

export default function App({
  Component,
  pageProps,
  router: { pathname, asPath },
}: AppProps & { Component: NextComponentType & Page }) {
  const { hasLogo = true, waveBackground } = Component

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <main className={`${font} w-full h-full`}>
        <ThemeCursorProvider>
          <Preloader duration={PRELOADER_DELAY} />
          {pathname !== '/404' && <Header />}

          <RoundedCorner waveBackground={!!waveBackground}>
            {waveBackground && <WaveMesh />}

            <AnimatePresence mode="sync">
              {hasLogo && <Logo />}
              <Component {...pageProps} key={asPath} />
            </AnimatePresence>
          </RoundedCorner>
        </ThemeCursorProvider>
      </main>
    </>
  )
}
