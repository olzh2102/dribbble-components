import React, { useState } from 'react'

import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Work_Sans, Inter } from '@next/font/google'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'

import { Lang, Page } from 'common/types'
import Header from '~components/header'
import HeaderClipPath from '~components/header/header-clip-path'
import Preloader from '~components/preloader'
import RoundedCorner from '~components/rounded-corner'
import Wave from '~components/wave'
import ThemeLangCursorProvider from '~contexts/index'

import '../styles/globals.css'

const cyrillicFont = Inter({ subsets: ['cyrillic', 'cyrillic-ext'] })
const font = Work_Sans()

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { Component: NextComponentType & Page }) {
  const locale = router.locale as Lang

  const [loading, setLoading] = useState(true)

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${locale !== 'ru' ? font.style.fontFamily : cyrillicFont.style.fontFamily};
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
