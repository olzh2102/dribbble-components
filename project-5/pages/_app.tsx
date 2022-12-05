import type { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import { Canvas } from '@react-three/fiber'
import { Rubik } from '@next/font/google'

import ThemeProvider from '~contexts/theme-provider'
import LangProvider from '~contexts/lang-provider'
import { Page } from 'common/types'

import '../styles/globals.css'
import RoundedCorner from '~components/rounded-corner'
import Head from 'next/head'
import ThemeToggler from '~components/theme-toggler'
import LangToggler from '~components/lang-toggler'
import Header from 'common/components/header'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Lang } from 'common/types'
import Wave from '~components/wave'

const CurrentTime = dynamic(() => import('~components/current-time'), {
  ssr: false,
})

const font = Rubik()

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextComponentType & Page }) {
  const locale = useRouter().locale

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
          {Component.waveBackground && (
            <div className="absolute top-0 left-0 w-full h-full p-3">
              <Canvas className="rounded-xl" camera={{ position: [0, 0, 1] }}>
                <Wave />
              </Canvas>
            </div>
          )}
          <RoundedCorner waveBackground={!!Component.waveBackground}>
            <Header>
              <CurrentTime />
              <LangToggler lang={locale as Lang} />
              <ThemeToggler />
            </Header>
            <Component {...pageProps} />
          </RoundedCorner>
        </ThemeProvider>
      </LangProvider>
    </>
  )
}
