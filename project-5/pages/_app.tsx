import React, { useState } from 'react'

import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Inter } from '@next/font/google'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'

import Header from 'common/components/header/header-v2'
import Preloader from 'common/components/preloader'
import { Page } from 'common/types'
import RoundedCorner from '~components/rounded-corner'
import Wave from '~components/wave'
import ThemeLangCursorProvider from '~contexts/index'
import '../styles/globals.css'

const font = Inter()
// TODO: select carefully what font to use
// * const font = Commissioner()

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { Component: NextComponentType & Page }) {
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
              <Canvas className="rounded-xl" camera={{ position: [0, 0, 1] }}>
                <Wave />
              </Canvas>
            </div>
          )}
          <Header />
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </RoundedCorner>
      </ThemeLangCursorProvider>
    </>
  )
}
