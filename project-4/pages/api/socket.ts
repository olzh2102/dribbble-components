import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { NextApiResponseServerIO } from '../../common/types';

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const httpServer = res.socket.server;
    const io = new ServerIO(httpServer);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.emit('me', socket.id);

      socket.on('disconnect', () => {
        socket.broadcast.emit('callended');
      });

      socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('calluser', { signal: signalData, from, name });
      });

      socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
      });

      socket.on('input-change', (msg) => {
        socket.broadcast.emit('update-input', msg);
      });
    });
  }
  res.end();
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default SocketHandler;
