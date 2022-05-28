import { NextPage } from 'next';
import { useRef, useState } from 'react';

import {
  useCreateVideoStream,
  useCreatePeer,
  useGetRoomId,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  useCreateVideoOnPageOpen,
} from '../../hooks';

const Qora: NextPage = () => {
  const roomId = useGetRoomId();

  const videoBoxContainer = useRef<HTMLDivElement>(null);
  const { stream } = useCreateVideoStream();

  useCreateVideoOnPageOpen({ stream, videoBoxContainer });

  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer, roomId });
  const [friend, setFriend] = useState('');

  usePeerOnJoinRoom({ peer, stream, videoBoxContainer, setFriend });
  usePeerOnAnswer({ peer, stream, videoBoxContainer, setFriend });

  if (!peer || !stream)
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
