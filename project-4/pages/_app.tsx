import { createContext, useState } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { TSocket } from '../common/types';

import '../styles/globals.css';
import { io } from 'socket.io-client';

export const SocketContext = createContext({});

const socket = io('/', { path: '/api/socketio' });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SocketContext.Provider value={{ socket }}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
