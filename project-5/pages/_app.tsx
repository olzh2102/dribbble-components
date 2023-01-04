import React, { useState } from "react";

import { Rubik, Commissioner } from "@next/font/google";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { NextComponentType } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "common/components/header";
import Preloader from "common/components/preloader";
import { Page, Lang } from "common/types";
import LangToggler from "~components/lang-toggler";
import RoundedCorner from "~components/rounded-corner";
import ThemeToggler from "~components/theme-toggler";
import Wave from "~components/wave";
import CursorProvider from "~contexts/cursor-provider";
import LangProvider from "~contexts/lang-provider";
import ThemeProvider from "~contexts/theme-provider";

import "../styles/globals.css";

const font = Commissioner();

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & { Component: NextComponentType & Page }) {
  const locale = useRouter().locale;

  const [loading, setLoading] = useState(true);

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
          <CursorProvider>
            {loading ? (
              <Preloader duration={2000} setLoading={setLoading} />
            ) : (
              <RoundedCorner waveBackground={!!Component.waveBackground}>
                {Component.waveBackground && (
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Canvas
                      className="rounded-xl"
                      camera={{ position: [0, 0, 1] }}
                    >
                      <Wave />
                    </Canvas>
                  </div>
                )}
                <Header>
                  <LangToggler lang={locale as Lang} />
                  <ThemeToggler />
                </Header>
                <AnimatePresence mode="wait" initial={false}>
                  <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
              </RoundedCorner>
            )}
          </CursorProvider>
        </ThemeProvider>
      </LangProvider>
    </>
  );
}
