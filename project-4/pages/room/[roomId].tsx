import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, useState } from 'react';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
} from '../../hooks';

const Room: NextPage = () => {
  const router = useRouter();
  const { peer } = useCreatePeer();
  // const { stream } = useCreateVideoStream({ audio: false, video: true });

  const { roomId } = router.query as { roomId: string };
  const { socket } = useSocketContext({ roomId });
  const [me, setMe] = useState('');
  const [friend, setFriend] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  if (stream && videoRef.current) videoRef.current.srcObject = stream;

  useEffect(() => {
    if (!peer || !socket || !stream) return;
    console.log('open peer');

    peer.on('open', (userId: string) => {
      setMe(userId);
      socket.emit('join-room', { roomId, userId });
    });
  });

  useEffect(() => {
    if (!peer || !socket) return;
    console.log('connect user, create call');

    socket.on('member-joined', (userId: string) => {
      setFriend(userId);
      const call = peer.call(userId, stream);

      call?.on('stream', (userVideoStream: MediaStream) => {
        if (videoRef2.current) videoRef2.current.srcObject = userVideoStream;
      });
    });
  });

  useEffect(() => {
    if (!peer || !stream) return;
    console.log('answer call');

    peer.on('call', (call: any) => {
      setFriend(call.peer);
      call.answer(stream);
      call.on('stream', (friendStream: MediaStream) => {
        if (videoRef2.current) videoRef2.current.srcObject = friendStream;
      });
    });
  });

  return (
    <>
      <h2>Room page</h2>
      <div className="flex h-screen">
        <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef}
            playsInline
            // muted
            autoPlay
          />
          <p>me: {me}</p>
        </div>
        <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef2}
            playsInline
            // muted
            autoPlay
          />
          <p>friend: {friend}</p>
        </div>
      </div>
    </>
  );
};

export default Room;
