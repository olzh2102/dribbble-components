import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Work_Sans } from '@next/font/google'
import localFont from '@next/font/local'
import { AnimatePresence } from 'framer-motion'

import { Page } from 'common/types'
import { Header, RoundedCorner } from '~components/layout'
import Logo from '~components/logo'
import Preloader from '~components/preloader'
import WaveMesh from '~components/wave'
import ThemeCursorProvider from '~contexts/index'

import '../styles/globals.css'

const latinFont = Work_Sans({ subsets: ['latin', 'latin-ext'] })
const cyrillicFont = localFont({
  src: '../public/fonts/WorkSans/WorkSans-Black.woff2',
})

export default function App({
  Component,
  pageProps,
  router: { locale, pathname, asPath },
}: AppProps & { Component: NextComponentType & Page }) {
  const { hasLogo = true, waveBackground } = Component
  const { className } = locale == 'ru' ? cyrillicFont : latinFont

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <main className={`${className} w-full h-full`}>
        <ThemeCursorProvider>
          <Preloader duration={3000} />
          {pathname !== '/404' && <Header />}

          <RoundedCorner waveBackground={!!waveBackground}>
            {waveBackground && <WaveMesh />}

            <AnimatePresence mode="wait">
              {hasLogo && <Logo />}
              <Component {...pageProps} key={asPath} />
            </AnimatePresence>
          </RoundedCorner>
        </ThemeCursorProvider>
      </main>
    </>
  )
}
