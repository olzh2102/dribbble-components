import { NextPage } from 'next';
import { useEffect, useCallback, useRef, useState } from 'react';
import Peer from 'simple-peer';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
  useGetRoomId,
} from '../../hooks';

const Chamber: NextPage = () => {
  const videoBoxContainer = useRef<HTMLDivElement>(null);

  const roomId = useGetRoomId();

  const peer1 = new Peer({ initiator: true });
  const peer2 = new Peer();

  peer1.on('signal', (data) => console.log('DATA1: ', data));
  peer2.on('signal', (data) => console.log('DATA2: ', data));
  peer2.on('stream', (stream) => console.log('STREAM:', stream));
  const { stream, isSuccess: isStreamSuccess } = useCreateVideoStream({
    audio: false,
    video: true,
  });

  const { socket } = useSocketContext({ roomId });
  const [me, setMe] = useState('');
  const [friend, setFriend] = useState('');

  return (
    <div className="m-12">
      <h2>QORA page</h2>
      <p>me: {me}</p>
      <p>friend: {friend}</p>
      <div ref={videoBoxContainer} className="flex h-screen" />
    </div>
  );
};

export default Chamber;
