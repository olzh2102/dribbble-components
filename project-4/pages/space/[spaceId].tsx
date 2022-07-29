import { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

import PeerVideo from '../../components/peer';
import App from '../../app/space';
import { toast } from 'react-toastify';
import { useUser } from '@auth0/nextjs-auth0';

const s = io('/', { path: '/api/socketio' });
export const SocketContext = createContext<any>(s);
export const SpaceContext = createContext<any>({});

const Space: NextPage = () => {
  const { user } = useUser();

  const [me, setMe] = useState('');
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [peers, setPeers] = useState<Record<string, Peer>>({});
  const [stream, setStream] = useState<Nullable<MediaStream>>(null);
  const [videos, setVideos] = useState<Record<string, any>>({});

  const videoRefs: KeyValue<HTMLDivElement> = {};

  useEffect(() => {
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    init();

    async function init() {
      const Peer = (await import('peerjs')).default;
      const peer = new Peer();
      setPeer(peer);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);

      setVideos((videos) => ({
        ...videos,
        [peer.id]: createNode()(peer.id, stream, { isMe: true, name: 'John' }),
      }));
    }
  }, []);

  useEffect(() => {
    if (!peer) return;

    peer.on('open', (id) => {
      setMe(id);
      s.emit('member:join', {
        userId: id,
        roomId: 'room id here',
        username: user?.name,
      });
      log('your devide id: ', id);
    });

    log('useeffect peer?1');
    peer.on('call', connectMe);
    log('useeffect peer?2');
    s.on('member:joined', connectMember);
  }, [peer]);

  return (
    <SocketContext.Provider value={{ socket: s }}>
      <SpaceContext.Provider value={{ me, peer, peers, stream, videos }}>
        <App />
      </SpaceContext.Provider>
    </SocketContext.Provider>
  );

  function connectMe(call: any) {
    log('connect me called?');
    call.answer(stream);

    setPeers((peers) => ({ ...peers, [call.peer]: call }));

    call.on('stream', (myStream: any) => {
      log('answer call stream');
      setVideos((videos) => ({
        ...videos,
        [call.peer]: createNode()(call.peer, myStream, {
          isMe: true,
          name: 'John',
        }),
      }));
    });

    call.on('close', () => {
      log('close call stream');
    });
  }

  function connectMember(id: any, name: any) {
    log('connect member called?');
    const call = peer?.call(id, stream as any, {
      metadata: { username: 'Baigus' },
    });
    setPeers((peers) => ({ ...peers, [id]: call }));
    log('who is calling a friend?', name, id);

    call?.on('stream', (friendStream) => {
      log("receiving friend's stream");

      setVideos((videos) => ({
        ...videos,
        [id]: createNode()(id, friendStream, { isMe: false, name }),
      }));
    });

    call?.on('close', () => {
      log(`${name} has left the room`);
    });
  }

  function createNode(classNames = 'drop-shadow-2xl shadow-indigo-500/50') {
    return (id: any, stream: any, { isMe, name }: any) => (
      <div
        key={id}
        className={classNames}
        ref={(node) => {
          if (node) videoRefs[id] = node;
        }}
      >
        <PeerVideo isMe={isMe} stream={stream} name={name} />
      </div>
    );
  }
};

export default Space;

type Nullable<T> = T | null;
type KeyValue<T> = Record<string, T>;

const log = console.log;
