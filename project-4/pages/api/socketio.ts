import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket } from 'net';
import { pipe } from 'ramda';

export default function socketHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (res.socket.server.io) console.log('Socket is already running...');
  else {
    const io = initIO(res);
    res.socket.server.io = io; // * append SocketIO server to NextJS socket server response
    io.on('connection', handleSocketEvents);
    res.end();
  }
}

function handleSocketEvents(socket: any) {
  socket.on('join-room', (roomId: any, userId: any) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
}

function initIO(res: NextApiResponseServerIO) {
  console.log('Socket is initializing...');

  const createIO = pipe(
    (res) => res.socket.server,
    (httpServer) => new SocketIOServer(httpServer, { path: '/api/socketio' })
  );

  const io = createIO(res);
  return io;
}

type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};
