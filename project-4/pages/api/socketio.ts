import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIO } from '../../common/types';
import { Server as NetServer } from 'http';

function ioHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Initializing socket.io...');

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;

    io.on('connection', (socket: any) => {
      socket.on('join-room', (roomId: any, userId: any) => {
        console.log('room id: ', roomId);
        console.log('user id: ', userId);

        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
      });
    });
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
