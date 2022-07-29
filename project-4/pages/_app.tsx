import { createContext, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { TSocket } from '../common/types';

import '../styles/globals.css';
import { io } from 'socket.io-client';

const socket = io('/', { path: '/api/socketio' });
export const SocketContext = createContext(socket);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <UserProvider>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
