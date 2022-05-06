import { Socket } from 'net';
import { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next/types';
import { Server as SocketIOServer } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};
