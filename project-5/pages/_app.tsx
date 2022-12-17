import React, { useEffect, useState } from 'react'

import { Rubik } from '@next/font/google'
import { Canvas } from '@react-three/fiber'
import Header from 'common/components/header'
import { Page, Lang } from 'common/types'
import { AnimatePresence } from 'framer-motion'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import LangToggler from '~components/lang-toggler'
import RoundedCorner from '~components/rounded-corner'
import ThemeToggler from '~components/theme-toggler'
import Wave from '~components/wave'
import CursorProvider from '~contexts/cursor-provider'
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

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

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

      <div className="w-full h-full z-10 absolute relative bg-neutral-900">
        <div className="flex relative">
          <div className="text-secondary-500 text-6xl p-4 absolute">NR</div>
        </div>

        <div className="text-secondary-500 absolute bottom-0 right-0 text-6xl p-4">
          58
        </div>
      </div>

      <LangProvider>
        <ThemeProvider>
          <CursorProvider>
            <div className="absolute top-0 left-0 w-full h-full p-3">
              <Canvas className="rounded-xl" camera={{ position: [0, 0, 1] }}>
                <Wave />
              </Canvas>
            </div>
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
          </CursorProvider>
        </ThemeProvider>
      </LangProvider>
    </>
  )
}
