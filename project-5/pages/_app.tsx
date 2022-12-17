import React, { useState } from 'react'

import { Rubik } from '@next/font/google'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from 'common/components/header'
import { Page, Lang } from 'common/types'
import LangToggler from '~components/lang-toggler'
import RoundedCorner from '~components/rounded-corner'
import ThemeToggler from '~components/theme-toggler'
import Wave from '~components/wave'
import LangProvider from '~contexts/lang-provider'
import ThemeProvider from '~contexts/theme-provider'

import '../styles/globals.css'

const CurrentTime = dynamic(() => import('~components/current-time'), {
  ssr: false,
})

const font = Rubik()

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { Component: NextComponentType & Page }) {
  const locale = useRouter().locale
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [mouseHidden, setMouseHidden] = useState(true)

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

      <LangProvider>
        <ThemeProvider>
          <div
            className="w-full h-full"
            onMouseMove={(e) => {
              setMouseHidden(false)
              setMousePosition({ x: e.pageX, y: e.pageY })
            }}
            onMouseOut={() => setMouseHidden(true)}
          >
            {Component.waveBackground && (
              <div className="absolute top-0 left-0 w-full h-full p-3">
                <Canvas className="rounded-xl" camera={{ position: [0, 0, 1] }}>
                  <Wave />
                </Canvas>
              </div>
            )}
            {!mouseHidden && (
              <div
                className="absolute w-6 h-6 bg-primary-100 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: mousePosition.x, top: mousePosition.y }}
              />
            )}
            <RoundedCorner waveBackground={!!Component.waveBackground}>
              <Header>
                <CurrentTime />
                <LangToggler lang={locale as Lang} />
                <ThemeToggler />
              </Header>
              <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </RoundedCorner>
          </div>
        </ThemeProvider>
      </LangProvider>
    </>
  )
}
