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
  usePeerOnLeftRoom,
} from '../../hooks';

const Qora: NextPage = () => {
  const roomId = useGetRoomId();

  const videoBoxContainer = useRef<HTMLDivElement>(null);
  const { stream } = useCreateVideoStream();

  useCreateVideoOnPageOpen({ stream, videoBoxContainer });

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer, roomId });
  const [friend, setFriend] = useState('');

  usePeerOnJoinRoom({ peer, stream, videoBoxContainer, setFriend, setPeers });
  usePeerOnAnswer({ peer, stream, videoBoxContainer, setFriend, setPeers });
  usePeerOnLeftRoom({ peers });

  if (!peer || !stream)
    return (
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
    );

  return (
    <div className="m-48 grid place-content-center">
      <h2 className="mb-8 font-semibold">Meeting topic: something</h2>
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
