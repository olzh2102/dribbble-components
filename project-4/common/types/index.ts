import { Socket as NetSocket } from 'net';
import { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next/types';
import { Server as SocketIOServer } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Socket as ClientSocket } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { Dispatch, SetStateAction } from 'react';
import { UserContext } from '@auth0/nextjs-auth0';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket<DefaultEventsMap, DefaultEventsMap>;

export type KeyValue<T> = Record<string, T>;
export type Nullable<T> = T | null;

export type QoraContextType = {
  socket: TSocket;
  roomId: string;
  peer: Peer;
  user: Pick<UserContext, 'user'>;
  isHost: boolean;
  stream: MediaStream;
  me: boolean;
  peers: KeyValue<Peer>;
  setPeers: Dispatch<SetStateAction<KeyValue<MediaConnection>>>;
  sharedScreenTrack: Nullable<MediaStreamTrack>;
  setSharedScreenTrack: Dispatch<SetStateAction<Nullable<MediaStreamTrack>>>;
};

export type RoomId = string;
export type PeerId = string;
