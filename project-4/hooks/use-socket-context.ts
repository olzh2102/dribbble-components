import { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { TSocket } from '../common/types';

const defaultValues: {
  socket: TSocket | null;
  setSocket: (val: TSocket) => void;
} = {
  socket: null,
  setSocket: () => {},
};

export const SocketContext = createContext(defaultValues);

const useSocketContext = ({ room }: { room: string }) => {
  const { socket, setSocket } = useContext(SocketContext);

  useEffect(() => {
    const s = io('/', { path: '/api/socketio' });

    s.emit('join-room', { room });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [room]);

  return { socket, setSocket };
};

export default useSocketContext;
