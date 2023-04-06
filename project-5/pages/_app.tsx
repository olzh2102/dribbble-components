import React, { useState } from 'react'

import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Work_Sans } from '@next/font/google'
import localFont from '@next/font/local'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'

import { Page } from 'common/types'
import { Header, RoundedCorner } from '~components/layout'
import Preloader from '~components/preloader'
import Wave from '~components/wave'
import ThemeLangCursorProvider from '~contexts/index'

import '../styles/globals.css'

const latinFont = Work_Sans()
const cyrillicFont = localFont({
  src: '../public/fonts/WorkSans/WorkSans-Black.woff',
})

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { Component: NextComponentType & Page }) {
  const font = useRouter().locale == 'ru' ? cyrillicFont : latinFont

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>

      <ThemeLangCursorProvider>
        {loading && <Preloader duration={3000} setLoading={setLoading} />}

        <RoundedCorner waveBackground={!!Component.waveBackground}>
          {Component.waveBackground && (
            <div className="absolute top-0 left-0 w-full h-full">
              <Canvas className="rounded-md" camera={{ position: [0, 0, 1] }}>
                <Wave />
              </Canvas>
            </div>
          )}

          {router.pathname !== '/404' && <Header />}

          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </RoundedCorner>
      </ThemeLangCursorProvider>
    </>
  )
}
