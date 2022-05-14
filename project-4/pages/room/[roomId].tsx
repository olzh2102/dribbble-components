import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useSocketContext } from '../../hooks';

const Room: NextPage = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function getStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
    }
    getStream();
  }, []);
  const [peer, setPeer] = useState<any>();
  useEffect(() => {
    (async () => {
      const PeerJs = (await import('peerjs')).default;
      const p = new PeerJs();
      setPeer(p);
    })();
  }, []);

  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const { socket } = useSocketContext({ roomId });

  const connectToNewUser = (userId: string) => {
    if (!peer || !stream) return;
    const call = peer.call(userId, stream);
    console.log('connected');
    call.on('stream', (userVideoStream: any) => {
      if (videoRef.current) videoRef.current.srcObject = userVideoStream;
    });
  };

  useEffect(() => {
    if (!peer || !socket) return;

    peer.on('open', (userId: any) => {
      socket.emit('join-room', { roomId, userId });
      console.log('peers established and joined the room');

      socket.on('user-connected', (userId) => {
        console.log('USER ID CONNECTED: ', userId);
        connectToNewUser(userId);
      });
    });
  }, [socket, peer]);

  useEffect(() => {
    if (!peer || !socket) return;

    socket.on('user-connected', (userId) => {
      console.log('USER ID CONNECTED: ', userId);
    });
  }, [socket, peer]);

  useEffect(() => {
    if (!peer || !socket || !stream) return;

    if (videoRef.current) videoRef.current.srcObject = stream;

    peer.on('call', (call: any) => {
      call.answer(stream);
      call.on('stream', (userVideoStream: any) => {
        if (videoRef.current) videoRef.current.srcObject = userVideoStream;
      });
    });
  }, [socket, peer]);

  return (
    <>
      <h2>Room page</h2>
      <video ref={videoRef} playsInline muted autoPlay />
    </>
  );
};

export default Room;
