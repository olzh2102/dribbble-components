import { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import App from '../../app';
import { TSocket } from '../../common/types';

const s = io('/', { path: '/api/socketio' });
export const SocketContext = createContext(s);

const Qora: NextPage = () => {
  return (
    <SocketContext.Provider value={s}>
      <div className="grid h-screen place-items-center place-content-center">
        <App />
      </div>
    </SocketContext.Provider>
  );
};

export default Qora;

type VideoRefsType = Record<string, HTMLDivElement>;
