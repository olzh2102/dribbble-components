import { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { pipe } from 'ramda';
import App from '../../app/bolme';
import { useGetRoomId } from '../../hooks';
import { useUser } from '@auth0/nextjs-auth0';

export const RoomContext = createContext<any>({});

const s = io('/', { path: '/api/socketio' });
export const SocketContext = createContext<any>(s);
const log = console.log;
const logE = console.error;

const Bolme: NextPage = () => {
  const roomId = useGetRoomId();
  const { user } = useUser();

  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

  const [videos, setVideos] = useState<any>({});
  const [shared, setShared] = useState<Nullable<MediaStreamTrack>>(null);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [me, setMe] = useState('');
  const [stream, setStream] = useState<Nullable<MediaStream>>(null);

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setStream(stream)

      const Peer = (await import('peerjs')).default;
      const peer = new Peer();

      setPeer(peer);

      peer.on('open', setMe);
      s.emit('join-room', {userId: me, username: user?.name, roomId})
      log('your device id is: ', me);
      
      s.on('member-joined', pipe(callPeer, receiveCall, appendJoinedPeer))

      peer.on('error', (err) => {
        logE('peer connection error: ', err);
      });
    })();
  }, []);

  return (
    <SocketContext.Provider value={{ ws: s }}>
      <RoomContext.Provider
        value={{ videos, sharedScreenTrack: shared, peer, me, isHost }}
      >
        <App />;
      </RoomContext.Provider>
    </SocketContext.Provider>
  );

  function callPeer({userId, username}: any) {
    const call = peer?.call(userId, (stream as any), { metadata: { username } })
    
    log('call friend with name and id:', username, userId);

    return { call, userId, username }
  }

  function receiveCall({call, userId, username}: any) {
    call.on('stream', (friendStream: any) => {
      log('friend stream', friendStream);

      setVideos((prev) => ({
        ...prev,
        [userId]: (
          <div
            key={id}
            ref={(node) =>
              node && setVideoRefs((prev) => ({ ...prev, [id]: node }))
            }
            className="drop-shadow-2xl shadow-indigo-500/50"
          >
            <PeerVideo isMe={userId === me} stream={friendStream} name={username} />
          </div>
        )
      


        addVideoStream({
          id: userId,
          name: username,
          stream: friendStream,
        });
    });
  }
};

export default Bolme;

type Nullable<T> = T | null;
