import { NextPage } from 'next';
import { createContext, useEffect } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { io } from 'socket.io-client';

import App from '../../app';
import 'react-toastify/dist/ReactToastify.css';

const s = io('/', { path: '/api/socketio' });
export const SocketContext = createContext(s);

const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};

const Qora: NextPage = () => {
  useEffect(() => {
    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={s}>
      <div className="grid h-screen place-items-center place-content-center relative p-6">
        <App />
      </div>
      <ToastContainer {...TOAST_PROPS} />
    </SocketContext.Provider>
  );
};

export default Qora;
