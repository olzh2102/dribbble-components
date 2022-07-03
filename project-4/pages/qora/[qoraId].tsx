import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserIcon } from '../../assets/icons';
import { ControlPanel } from '../../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  useCreateVideoOnPageOpen,
  usePeerOnLeftRoom,
  useAddVideoStream,
  useGetRoomId,
  useSocketContext,
} from '../../hooks';

const DEFAULT_CONSTRAINTS = {
  video: true,
  audio: true,
};

const Qora: NextPage = () => {
  const router = useRouter();

  const roomId = useGetRoomId();

  const [amIHost, setAmIHost] = useState(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    setAmIHost(!!window.localStorage.getItem(roomId));
  }, [roomId]);

  const [videoRefs, setVideoRefs] = useState<VideoRefsType>({});
  const [videos, setVideos] = useState<Record<string, JSX.Element>>({});

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer });

  const { stream } = useCreateVideoStream(DEFAULT_CONSTRAINTS);

  const addVideoStream = useAddVideoStream({
    setVideos,
    setVideoRefs,
  });

  useCreateVideoOnPageOpen({ stream, id: me, addVideoStream });

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });

  usePeerOnLeftRoom({ peers, videoRefs });

  function toggle(type: 'audio' | 'video', peerId = me) {
    const stream: any = (videoRefs[peerId].children[0] as HTMLVideoElement)
      .srcObject;

    const tracks =
      type === 'video' ? stream.getTracks() : stream.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    if (track.enabled) track.enabled = false;
    else track.enabled = true;
  }

  return (
    <div className="grid h-screen place-items-center place-content-center">
      {!peer || !stream ? (
        <>
          <span className="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-gray-400 opacity-75 -z-10" />
          <UserIcon className="h-48 w-48" />
        </>
      ) : (
        <>
          <h2 className="mb-8 font-mono text-white">
            Meeting topic: something
          </h2>
          <div className="flex w-full flex-wrap gap-4 justify-center">
            {Object.values(videos)}
          </div>
          <ControlPanel
            onVideo={() => toggle('video')}
            onAudio={() => toggle('audio')}
            onHangUp={() => router.push('/')}
            constraints={DEFAULT_CONSTRAINTS}
          />
        </>
      )}
    </div>
  );
};

export default Qora;

type VideoRefsType = Record<string, HTMLDivElement>;
