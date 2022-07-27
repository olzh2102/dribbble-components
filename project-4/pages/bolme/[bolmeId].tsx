import { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Peer, { MediaConnection } from 'peerjs';
import { pipe, mergeLeft } from 'ramda';
import App from '../../app/bolme';
import { useGetRoomId } from '../../hooks';
import { useUser } from '@auth0/nextjs-auth0';
import { PeerVideo } from '../../components';
import { useRouter } from 'next/router';

export const RoomContext = createContext<any>({});

const s = io('/', { path: '/api/socketio' });
export const SocketContext = createContext<any>(s);
const log = console.log;
const logE = console.error;

const Bolme: NextPage = () => {
  
  useEffect(() => {
    init();

    async function init() {
      const Peer = (await import('peerjs')).default;
      const peer = new Peer();

      const stream = await createStream({ video: true, audio: true })
      addVideoStream(me, stream)({ isMe: true, name: user.name })

      peer.on('call', (call) => {
        
      })
    }
  }, [])

  return (
    <SocketContext.Provider value={{ ws: s }}>
      <RoomContext.Provider
        value={{ 
          videos, 
          sharedScreenTrack: shared, 
          peer, 
          me, 
          isHost, 
          peers 
        }}
      >
        <App />
      </RoomContext.Provider>
    </SocketContext.Provider>
  );

export default Bolme;

type Nullable<T> = T | null;
type KeyValue<T> = Record<string, T>

// * --- helpers ---
async function createStream(constrains: any) {
  const stream = await navigator.mediaDevices.getUserMedia(constrains) 
  return stream
} 

/* 
const router = useRouter();
  const { bolmeId: roomId } = router.query as { bolmeId: string };
  const { user } = useUser();

  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

  const [videos, setVideos] = useState<any>({});
  const [videoRefs, setVideoRefs] = useState<KeyValue<HTMLDivElement>>({});
  const [shared, setShared] = useState<Nullable<MediaStreamTrack>>(null);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [me, setMe] = useState('');
  const [stream, setStream] = useState<Nullable<MediaStream>>(null);
  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(stream);

      const Peer = (await import('peerjs')).default;
      const peer = new Peer();

      setPeer(peer);

      peer.on('open', handlePeerOnOpen);
      peer.on('error', handlePeerOnError);
    })();
  }, [user]);
*/