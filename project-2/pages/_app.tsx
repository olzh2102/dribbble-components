import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '.';

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default App;
