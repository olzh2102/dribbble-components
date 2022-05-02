import { Server } from 'socket.io';

function ioHandler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log('Initializing socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', (socket: any) => {
      socket.on('join-room', (roomId: any, userId: any) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket connection is already on');
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
