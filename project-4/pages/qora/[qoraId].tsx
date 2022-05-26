import { NextPage } from 'next';
import { useEffect, useCallback, useRef, useState } from 'react';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
  useGetRoomId,
} from '../../hooks';

const Qora: NextPage = () => {
  const videoBoxContainer = useRef<HTMLDivElement>(null);
  const roomId = useGetRoomId();

  const { peer } = useCreatePeer();
  const { stream } = useCreateVideoStream({
    video: true,
    audio: false,
  });
  const { socket } = useSocketContext();

  const [me, setMe] = useState('');
  const [friend, setFriend] = useState('');

  const addVideoStream = useCallback(
    (video: HTMLVideoElement, stream: MediaStream) => {
      video.className = 'rounded-3xl max-w-md max-h-80 mr-4';
      video.muted = false;
      video.playsInline = true;
      video.autoplay = true;

      video.srcObject = stream;

      if (videoBoxContainer.current) videoBoxContainer.current.append(video);
    },
    []
  );

  useEffect(() => {
    if (!peer || !stream || !socket) return;
    const video = document.createElement('video');
    addVideoStream(video, stream);

    peer.on('open', () => {
      setMe(peer.id);
      socket.emit('join-room', { userId: peer.id, roomId });

      console.log('Your device ID is: ', peer.id);
    });

    socket.on('member-joined', (friendId: any) => {
      setFriend(friendId);

      const call = peer.call(friendId, stream);
      console.log('call friend with id:', friendId);

      call.on('stream', (friendStream: MediaStream) => {
        console.log('friend stream');
        const video = document.createElement('video');
        addVideoStream(video, friendStream);
      });
    });

    peer.on('call', (call: any) => {
      setFriend(call.peer);
      console.log('answer call from:', call.peer);
      call.answer(stream);
      call.on('stream', (hostStream: MediaStream) => {
        console.log('answer call stream');
        const video = document.createElement('video');
        addVideoStream(video, hostStream);
      });
    });
  }, [socket, peer, stream]);

  if (!peer || !stream || !socket)
    return (
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    );

  return (
    <div className="m-48">
      <h2 className="mb-8 font-semibold">QORA page</h2>
      <p className="font-medium">
        me: <span className="text-blue-600">{me}</span>
      </p>
      <p className="font-medium mb-4">
        friend: <span className="text-blue-600">{friend}</span>
      </p>
      <div ref={videoBoxContainer} className="flex h-screen" />
    </div>
  );
};

export default Qora;
