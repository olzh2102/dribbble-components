import { NextComponentType } from 'next'

import type { AppProps } from 'next/app'
import Head from 'next/head'

// import { Noto_Sans_Display } from '@next/font/google'
import localFont from '@next/font/local'
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

// const font = Noto_Sans_Display({ subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'] })
const fontHelveticaNeueCyr = localFont({
  src: '../public/fonts/helvetica-neue/HelveticaNeueCyr-Light.woff',
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

        .logo-subtitle {
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
