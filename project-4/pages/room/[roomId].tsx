import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, useState } from 'react';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
} from '../../hooks';

const Room: NextPage = () => {
  console.log('render');
  const [users, setUsers] = useState([]) as any;

  const router = useRouter();
  const peer = useCreatePeer();
  const stream = useCreateVideoStream({ audio: true, video: true });

  const { roomId } = router.query as { roomId: string };
  const { socket } = useSocketContext({ roomId });

  const videoRef = useRef<HTMLVideoElement>(null);

  if (stream && videoRef.current) videoRef.current.srcObject = stream;

  // console.log(peer);

  // const connectToNewUser = (userId: string) => {
  //   if (!peer || !stream) return;
  //   const call = peer.call(userId, stream);
  //   console.log('connected');
  //   call.on('stream', (userVideoStream: any) => {
  //     if (videoRef.current) videoRef.current.srcObject = userVideoStream;
  //   });
  // };

  const fn = useCallback(() => {
    if (!peer || !socket) return;

    peer.on('open', (userId: any) => {
      console.log('My peer ID is: ', userId);
      socket.emit('join-room', { roomId, userId });
      console.log('peers established and joined the room');

      socket.on('user-connected', (userId) => {
        users.push(userId);
        console.log(users);
        setUsers(users);
        console.log('USER ID CONNECTED: ', userId);
        // connectToNewUser(userId);
      });
    });
  }, [socket, peer, users.length]);

  useEffect(fn, [fn]);

  console.log('USERS: ', users);

  // useEffect(() => {
  //   if (!peer || !socket || !stream) return;

  //   if (videoRef.current) videoRef.current.srcObject = stream;

  //   peer.on('call', (call: any) => {
  //     call.answer(stream);
  //     call.on('stream', (userVideoStream: any) => {
  //       if (videoRef.current) videoRef.current.srcObject = userVideoStream;
  //     });
  //   });
  // }, [socket, peer]);

  return (
    <>
      <h2>Room page</h2>
      <div className="flex h-screen">
        <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef}
            playsInline
            muted
            autoPlay
          />
        </div>
        {users.map((user: any) => (
          <span>Joined user: {user}</span>
        ))}
      </div>
    </>
  );
};

export default Room;
