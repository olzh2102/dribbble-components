import { createContext } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { io } from 'socket.io-client';

import '../styles/globals.css';

const socket = io('/', { path: '/api/socketio' });
export const SocketContext = createContext(socket);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserProvider>
  );
}
