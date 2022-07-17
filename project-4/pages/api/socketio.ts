import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIO } from '../../common/types';

const socketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');

    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer, { path: '/api/socketio' });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('connected');

      socket.on('join-room', ({ roomId, userId, username }) => {
        console.log('USER ID: ', userId);
        console.log('ROOM ID: ', roomId);
        console.log('NAME: ', username);

        socket.join(roomId);
        socket.to(roomId).emit('member-joined', { userId, username });

        socket.on('disconnect', () => {
          socket.to(roomId).emit('member-left', userId);
        });

        socket.on('remove-peer', (userId) => {
          socket.to(roomId).emit('member-left', userId);
        });

        socket.on('mute-peer', (userId) => {
          socket.to(roomId).emit('member-muted', userId);
        });

        socket.on('toggle-audio-status', (userId) => {
          socket.to(roomId).emit('audio-status-toggled', userId);
        });

        socket.on('send-message', ({ text, userId }) => {
          socket.to(roomId).emit('message-from-peer', { text, userId });
        });
      });
    });
  }

  res.end();
};

export default socketHandler;
