import React, { useState } from 'react'

import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

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
  const [loading, setLoading] = useState(true)

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
        {loading && <Preloader duration={3000} setLoading={setLoading} />}
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
            <Component {...pageProps} key={asPath} />
          </AnimatePresence>
        </RoundedCorner>
      </ThemeCursorProvider>
    </>
  )
}
