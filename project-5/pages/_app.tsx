import type { AppProps } from 'next/app'
import { Rubik } from "@next/font/google";

import ThemeProvider from "~contexts/theme-provider";
import LangProvider from "~contexts/lang-provider";

import "../styles/globals.css";

const font = Rubik();

export default function App({ Component, pageProps }: AppProps) {
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
