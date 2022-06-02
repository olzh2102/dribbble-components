import { NextPage } from 'next';
import { useState } from 'react';

import {
  useCreateVideoStream,
  useCreatePeer,
  useGetRoomId,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  useCreateVideoOnPageOpen,
  usePeerOnLeftRoom,
  useAddVideoStream,
} from '../../hooks';

const Qora: NextPage = () => {
  const roomId = useGetRoomId();

  const [videoRefs, setVideoRefs] = useState<Record<string, HTMLDivElement>>(
    {}
  );
  const [videos, setVideos] = useState<JSX.Element[]>([]);
  const { stream } = useCreateVideoStream();

  const addVideoStream = useAddVideoStream({ setVideos, setVideoRefs });

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer, roomId });

  useCreateVideoOnPageOpen({ stream, id: me, addVideoStream });
  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });
  usePeerOnLeftRoom({ peers, videoRefs });

  if (!peer || !stream)
    return (
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
    );

  return (
    <div className="m-48 grid place-content-center">
      <h2 className="mb-8 font-semibold">Meeting topic: something</h2>
      <div className="flex">{videos}</div>
    </div>
  );
};

export default Qora;
