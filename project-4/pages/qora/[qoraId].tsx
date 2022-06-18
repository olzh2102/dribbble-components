import { useUser } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserIcon } from '../../assets/icons';
import { ControlPanel } from '../../components';

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

const DEFAULT_CONSTRAINTS = {
  video: true,
  audio: true,
};

const Qora: NextPage = () => {
  const router = useRouter();

  const [videoRefs, setVideoRefs] = useState<VideoRefsType>({});
  const [videos, setVideos] = useState<Record<string, JSX.Element>>({});

  const addVideoStream = useAddVideoStream({ setVideos, setVideoRefs });

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer });

  const { stream } = useCreateVideoStream(DEFAULT_CONSTRAINTS);

  useCreateVideoOnPageOpen({ stream, id: me, addVideoStream });

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });

  usePeerOnLeftRoom({ peers, videoRefs });

  function toggle(type: 'audio' | 'video') {
    const stream = (videoRefs[me].children[0] as HTMLVideoElement).srcObject;
    const track =
      type === 'video'
        ? (stream as any).getTracks()
        : (stream as any).getAudioTracks();
    track.find((track: any) => track.kind == type);

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
          <h2 className="mb-8 font-semibold">Meeting topic: something</h2>
          <div className="flex w-full flex-wrap gap-4 justify-center">
            {Object.values(videos).map((component) => component)}
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
