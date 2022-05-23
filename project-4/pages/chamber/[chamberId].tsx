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

  const { peer, isSuccess: isPeerSuccess } = useCreatePeer();
  const { stream, isSuccess: isStreamSuccess } = useCreateVideoStream({
    audio: false,
    video: true,
  });

  const { socket } = useSocketContext({ roomId });
  const [me, setMe] = useState('');
  const [friend, setFriend] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const addStream = useCallback((stream: MediaStream, userId: string) => {
    const container = document.createElement('div');
    const user = document.createElement('p');
    user.innerText = userId;

    const video = document.createElement('video');
    video.className = 'rounded-2xl max-w-md max-h-80';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    video.srcObject = stream;
    container.append(video, user);

    if (videoBoxContainer.current) videoBoxContainer.current.append(container);
  }, []);

  useEffect(() => {
    if (isStreamSuccess && stream && me) addStream(stream, me);
  }, [isStreamSuccess, me]);
  // if (stream && videoRef.current) videoRef.current.srcObject = stream;

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
    if (isPeerSuccess && peer && socket) {
      console.log('connect user, create call');

      socket.on('member-joined', (userId: string) => {
        setFriend(userId);
        const call = peer.call(userId, stream);

        call?.on('stream', (userVideoStream: MediaStream) => {
          addStream(userVideoStream, userId);
          // if (videoRef2.current) videoRef2.current.srcObject = userVideoStream;
        });
      });
    }
  }, [isPeerSuccess]);

  useEffect(() => {
    if (isPeerSuccess && isStreamSuccess && peer && stream) {
      console.log('answer call');

      peer.on('call', (call: any) => {
        setFriend(call.peer);
        call.answer(stream);
        call.on('stream', (friendStream: MediaStream) => {
          addStream(friendStream, friend);
          // if (videoRef2.current) videoRef2.current.srcObject = friendStream;
        });
      });
    }
  }, [isPeerSuccess]);

  return (
    <>
      <h2>Room page</h2>
      <p>me: {me}</p>
      <p>friend: {friend}</p>
      <div ref={videoBoxContainer} className="flex h-screen">
        {/* <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef}
            playsInline
            muted
            autoPlay
          />
        </div>
        <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef2}
            playsInline
            muted
            autoPlay
          />
          <p>friend: {friend}</p>
        </div> */}
      </div>
    </>
  );
};

export default Chamber;
