// import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { queryClient } from '.';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    display: block;
    height: 100%;
    margin: 0 auto;
    padding: 0
  }

  body {
    background-color: #fafafa;
    min-height: 100vh;
    padding: 1rem;
    margin-top: 0;
    font-family: 'Verdana'
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`
const theme = {
  colors: {
    primary: '#fafafa',
  }
}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  </>
);

export default App;
