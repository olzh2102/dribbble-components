import { createContext, useState } from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/globals.css';
import { io } from 'socket.io-client';

const socket = io('/', { path: '/api/socketio' });
export const SocketContext = createContext(socket);
export const InitialStreamSettingsContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <UserProvider>
      <SocketContext.Provider value={socket}>
        <InitialStreamSettingsContext.Provider
          value={{
            isMuted,
            isVisible,
            setIsMuted: () => setIsMuted(!isMuted),
            setIsVisible: () => setIsVisible(!isVisible),
          }}
        >
          <Component {...pageProps} />
        </InitialStreamSettingsContext.Provider>
      </SocketContext.Provider>
    </UserProvider>
  );
}

export default MyApp;
