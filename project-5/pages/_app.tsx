import type { AppProps } from 'next/app'
import { Rubik } from "@next/font/google";

import ThemeProvider from "~contexts/theme-provider";
import LangProvider from "~contexts/lang-provider";

import "../styles/globals.css";
import { NextComponentType } from "next";

const font = Rubik();

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextComponentType & { waveBackground: boolean } }) {
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
