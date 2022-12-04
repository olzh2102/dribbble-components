import type { AppProps } from 'next/app'
import { NextComponentType } from "next";
import { Rubik } from "@next/font/google";

import ThemeProvider from "~contexts/theme-provider";
import LangProvider from "~contexts/lang-provider";
import { PageWithWaveCanvas } from "common/types";

import "../styles/globals.css";

const font = Rubik();

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextComponentType & PageWithWaveCanvas }) {
  // TODO: remove console once header and canvas components are rendered inside this file
  console.log(
    "With Canvas Wave Background: ",
    Component.waveBackground
      ? "Yes, render the page with canvas wave background"
      : "No, I am good without"
  );

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <LangProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </LangProvider>
    </>
  );
}
