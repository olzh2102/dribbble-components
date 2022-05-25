import { NextPage } from 'next';
import { useEffect, useCallback, useRef, useState } from 'react';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
  useGetRoomId,
} from '../../hooks';

const Chamber: NextPage = () => {
  const videoBoxContainer = useRef<HTMLDivElement>(null);
  const roomId = useGetRoomId();
  const peers: Record<string, any> = {};

  const { peer, isSuccess: isPeerSuccess } = useCreatePeer();
  const { stream, isSuccess: isStreamSuccess } = useCreateVideoStream({
    audio: false,
    video: true,
  });

  const { socket } = useSocketContext({ roomId });
  const [me, setMe] = useState('');
  const [friend, setFriend] = useState('');

  const addStream = useCallback(
    (video: HTMLVideoElement, stream: MediaStream) => {
      video.className = 'rounded-2xl max-w-md max-h-80';
      video.muted = false;
      video.playsInline = true;
      video.autoplay = true;

      video.srcObject = stream;

      if (videoBoxContainer.current) videoBoxContainer.current.append(video);
    },
    []
  );

  const connectToNewUser = useCallback(
    (userId: string, stream: MediaStream) => {
      if (!peer) return;

      const call = peer.call(userId, stream);
      const video = document.createElement('video');

      console.log('CALL OBJ: ', call);
      call.on('stream', (userVideoStream: MediaStream) => {
        console.log('HERE???');
        addStream(video, userVideoStream);
      });
      call.on('close', () => {
        console.log('CLOSE');
        video.remove();
      });

      peers[userId] = call;
    },
    [isPeerSuccess]
  );

  useEffect(() => {
    if (isStreamSuccess && stream) {
      const video = document.createElement('video');
      addStream(video, stream);
    }
  }, [isStreamSuccess]);

  useEffect(() => {
    if (isPeerSuccess && peer && socket) {
      console.log('open peer');

      peer.on('open', (userId: string) => {
        setMe(userId);
        socket.emit('join-room', { roomId, userId });
      });
    }
  }, [isPeerSuccess]);

  useEffect(() => {
    console.log('connect user, create call');

    socket?.on('member-joined', (userId: string) => {
      setFriend(userId);
      console.log('PEER OBJ: ', peer);
      console.log('STREAM: ', stream);
      console.log('USER ID: ', userId);

      console.log('MAYBE HERE???');

      if (stream) connectToNewUser(userId, stream);
    });

    socket?.on('member-left', (userId: string) => {
      console.log('member left');
      if (userId in peers) peers[userId].close();
    });
  }, [isStreamSuccess, isPeerSuccess]);

  useEffect(() => {
    if (isPeerSuccess && isStreamSuccess) {
      console.log('answer call');

      peer.on('call', (call: any) => {
        setFriend(call.peer);
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (friendStream: MediaStream) => {
          addStream(video, friendStream);
        });
      });
    }
  }, [isPeerSuccess]);

  return (
    <>
      <h2>Room page</h2>
      <p>me: {me}</p>
      <p>friend: {friend}</p>
      <div ref={videoBoxContainer} className="flex h-screen" />
    </>
  );
};

export default Chamber;
