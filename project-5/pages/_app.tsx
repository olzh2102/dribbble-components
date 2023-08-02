import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import Head from 'next/head'

import { AnimatePresence } from 'framer-motion'

import { PRELOADER_DELAY } from 'common/constants'
import { Page } from 'common/types'
import { Header, RoundedCorner } from '~components/layout'
import Logo from '~components/logo'
import Preloader from '~components/preloader'
import WaveMesh from '~components/wave'
import ThemeCursorProvider from '~contexts/index'
import useResponsive from '~hooks/use-responsive'
import '../styles/globals.css'

const fontHelveticaNeueCyr = localFont({
  src: [
    {
      path: '../public/fonts/helvetica-neue/HelveticaNeueCyr-Light.woff',
      weight: '300',
    },
    {
      path: '../public/fonts/helvetica-neue/HelveticaNeueCyr-Black.woff',
      weight: '400',
    },
    {
      path: '../public/fonts/helvetica-neue/HelveticaNeueCyr-Medium.woff',
      weight: '500',
    },
    {
      path: '../public/fonts/helvetica-neue/HelveticaNeueCyr-Bold.woff',
      weight: '800',
    },
  ],
})

const fontBaron = localFont({
  src: '../public/fonts/baron-neue/BaronNeue.woff',
})

export default function App({
  Component,
  pageProps,
  router: { pathname, asPath },
}: AppProps & { Component: NextComponentType & Page }) {
  const { hasLogo = true, waveBackground } = Component
  const isMobile = useResponsive('sm')

  return (
    <>
      <Head>
        <title>NR</title>
        <meta name="description" content="NR" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${fontHelveticaNeueCyr.style.fontFamily};
        }

        .text-logo {
          font-family: ${fontBaron.style.fontFamily};
        }
      `}</style>

      <main className={`w-full h-full`}>
        <ThemeCursorProvider>
          <Preloader duration={PRELOADER_DELAY} />
          {pathname !== '/404' && <Header />}

          <RoundedCorner waveBackground={!!waveBackground}>
            {waveBackground && <WaveMesh />}

            <AnimatePresence mode="sync">
              {hasLogo && !isMobile && (
                <div className="absolute top-4 left-4">
                  <Logo />
                </div>
              )}
              <Component {...pageProps} key={asPath} />
            </AnimatePresence>
          </RoundedCorner>
        </ThemeCursorProvider>
      </main>
    </>
  )
}
