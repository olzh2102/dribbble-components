import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-toastify@9.0.6/dist/ReactToastify.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
