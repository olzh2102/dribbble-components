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

const Qora: NextPage = () => {
  const roomId = useGetRoomId();
  const router = useRouter();

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
  console.log((videoRefs[me]?.children[0] as any)?.srcObject);

  function toggleVideoStream() {
    const stream = (videoRefs[me]?.children[0] as any)?.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track: any) {
      track.stop();
    });
    (videoRefs[me].children[0] as HTMLVideoElement).srcObject = null;
  }

  function handleHangUp() {
    router.push('/');
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
            {videos}
          </div>
          <ControlPanel
            onVideo={toggleVideoStream}
            onAudio={() => {}}
            onHangUp={handleHangUp}
          />
        </>
      )}
    </div>
  );
};

export default Qora;
