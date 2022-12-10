import { Rubik } from '@next/font/google'
import { Canvas } from '@react-three/fiber'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from 'common/components/header'
import { Page, Lang } from 'common/types'
import '../styles/globals.css'
import LangToggler from '~components/lang-toggler'
import RoundedCorner from '~components/rounded-corner'
import ThemeToggler from '~components/theme-toggler'
import Wave from '~components/wave'
import LangProvider from '~contexts/lang-provider'
import ThemeProvider from '~contexts/theme-provider'

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
