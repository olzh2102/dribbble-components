import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'

import { Work_Sans } from '@next/font/google'
import localFont from '@next/font/local'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'

import { Page } from 'common/types'
import { Header, RoundedCorner } from '~components/layout'
import Preloader from '~components/preloader'
import Wave from '~components/wave'
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
  const { hasLogo = true } = Component

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <style jsx global>
        {`
          html {
            font-family: ${(locale == 'ru' ? cyrillicFont : latinFont).style
              .fontFamily};
          }
        `}
      </style>

      <ThemeCursorProvider>
        <Preloader duration={3000} />
        {pathname !== '/404' && <Header />}

        <RoundedCorner waveBackground={!!Component.waveBackground}>
          {Component.waveBackground && (
            <div className="absolute top-0 left-0 w-full h-full">
              <Canvas camera={{ position: [0, 0, 1] }}>
                <Wave />
              </Canvas>
            </div>
          )}

          <AnimatePresence mode="wait">
            {hasLogo && (
              <Image
                src="/nr-logo.svg"
                width="40"
                height="40"
                alt="logo"
                className="absolute mix-blend-difference top-4 left-4"
              />
            )}

            <Component {...pageProps} key={asPath} />
          </AnimatePresence>
        </RoundedCorner>
      </ThemeCursorProvider>
    </>
  )
}
