import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MutedIcon, UserIcon } from '../../assets/icons';
import { ControlPanel, HostControlPanel } from '../../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  useCreateVideoOnPageOpen,
  usePeerOnLeftRoom,
  useAddVideoStream,
  useSocketContext,
  useGetRoomId,
} from '../../hooks';

const DEFAULT_CONSTRAINTS = {
  video: true,
  audio: true,
};

const Qora: NextPage = () => {
  const router = useRouter();
  const { socket } = useSocketContext();
  const roomId = useGetRoomId();

  const [videoRefs, setVideoRefs] = useState<VideoRefsType>({});
  const [videos, setVideos] = useState<Record<string, JSX.Element>>({});

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer });

  const { stream } = useCreateVideoStream(DEFAULT_CONSTRAINTS);

  const [isHost, setIsHost] = useState(false);
  const [isMuted, setIsMuted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsHost(!!window.localStorage.getItem(roomId));
  }, [roomId]);

  const toggle = useCallback(
    (type: 'audio' | 'video', peerId = me) => {
      const stream: any = (videoRefs[peerId].children[0] as HTMLVideoElement)
        .srcObject;

      const tracks =
        type === 'video' ? stream.getTracks() : stream.getAudioTracks();
      const track = tracks.find((track: any) => track.kind == type);

      if (track.enabled) track.enabled = false;
      else track.enabled = true;

      setIsMuted((prev) => ({ ...prev, [peerId]: !isMuted[peerId] }));
    },
    [isMuted, videoRefs]
  );

  const handleHangUp = (id: string) => {
    socket?.emit('remove-peer', id);
    peers[id]?.close();
    videoRefs[id]?.remove();
  };

  const addVideoStream = useAddVideoStream({
    setVideos,
    setVideoRefs,
  });

  useCreateVideoOnPageOpen({ stream, id: me, addVideoStream });

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });

  usePeerOnLeftRoom({ peers, videoRefs });

  useEffect(() => {
    socket?.on('member-muted', (memberId: string) => {
      if (!videoRefs[memberId]) return;

      setIsMuted((prev) => ({ ...prev, [memberId]: !isMuted[memberId] }));
    });
  }, [toggle, Object.keys(videoRefs).length]);

  return (
    <div className="grid h-screen place-items-center place-content-center">
      {!peer || !stream ? (
        <>
          <span className="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-gray-400 opacity-75 -z-10" />
          <UserIcon className="h-48 w-48" />
        </>
      ) : (
        <>
          <div className="flex w-full flex-wrap gap-4 justify-center">
            {Object.entries(videos).map(([id, element]) => (
              <div key={id} className="relative group">
                {element}
                {isHost && me !== id && (
                  <HostControlPanel
                    onHangUp={() => handleHangUp(id)}
                    onToggleAudio={() => {
                      // * mute peer across other peers
                      socket?.emit('mute-peer', id);

                      // * mute peer on host room
                      toggle('audio', id);
                    }}
                  />
                )}
                {isMuted[id] && (
                  <div className="absolute top-3 right-3">
                    <MutedIcon />
                  </div>
                )}
              </div>
            ))}
          </div>
          <ControlPanel
            onVideo={() => toggle('video')}
            onAudio={() => {
              toggle('audio');
              socket?.emit('mute-peer', me);
            }}
            onHangUp={() => router.push('/')}
            isMuted={isMuted[me]}
            constraints={DEFAULT_CONSTRAINTS}
          />
        </>
      )}
    </div>
  );
};

export default Qora;

type VideoRefsType = Record<string, HTMLDivElement>;
