import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MutedIcon, UserIcon } from '../../assets/icons';
import { ControlPanel, HostControlPanel, PeerVideo } from '../../components';
import { io } from 'socket.io-client';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  usePeerOnLeftRoom,
  useGetRoomId,
} from '../../hooks';

const Qora: NextPage = () => {
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const s = io('/', { path: '/api/socketio' });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);
  const roomId = useGetRoomId();

  const [videoRefs, setVideoRefs] = useState<VideoRefsType>({});
  const [videos, setVideos] = useState<Record<string, JSX.Element>>({});

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer, socket });

  const { stream } = useCreateVideoStream({
    video: true,
    audio: true,
  });

  const [isHost, setIsHost] = useState(false);
  const [isMuted, setIsMuted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsHost(!!window.localStorage.getItem(roomId));
  }, [roomId]);

  function toggle(type: 'audio' | 'video', peerId = me) {
    const stream: any = (videoRefs[peerId].children[0] as HTMLVideoElement)
      .srcObject;

    const tracks =
      type === 'video' ? stream.getTracks() : stream.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    if (track.enabled) track.enabled = false;
    else track.enabled = true;

    if (type === 'audio')
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
  }

  function handleHangUp(id: string) {
    socket?.emit('remove-peer', id);
    peers[id]?.close();
    videoRefs[id]?.remove();
  }

  function addVideoStream({
    id,
    name,
    stream,
    isMe,
  }: {
    id: string;
    name?: string;
    stream: MediaStream;
    isMe?: boolean;
  }) {
    setVideos((prev) => ({
      ...prev,
      [id]: (
        <div
          key={id}
          ref={(node) =>
            node && setVideoRefs((prev) => ({ ...prev, [id]: node }))
          }
          className="drop-shadow-2xl shadow-indigo-500/50"
        >
          <PeerVideo isMe={isMe} stream={stream} name={name} />
        </div>
      ),
    }));
  }

  useEffect(() => {
    if (!stream) return;
    me && addVideoStream({ id: me, stream, isMe: true });
  }, [me]);

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers, socket });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });

  usePeerOnLeftRoom({ peers, videoRefs, socket });

  useEffect(() => {
    socket?.on('member-muted', (peerId: string) => {
      if (!videoRefs[peerId]) return;
      toggle('audio', peerId);
    });

    return () => socket?.off('member-muted');
  }, [Object.keys(videoRefs).length]);

  return (
    <div className="grid h-screen place-items-center place-content-center">
      {!peer || !stream ? (
        <div
          className="spinner-grow inline-block w-12 h-12 bg-white rounded-full opacity-0"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
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
                      socket?.emit('mute-peer', id);
                      setIsMuted((prev) => ({ ...prev, [id]: !prev[id] }));
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
              socket?.emit('mute-peer', me);
              setIsMuted((prev) => ({ ...prev, [me]: !prev[me] }));
            }}
            onHangUp={() => router.push('/')}
            isMuted={isMuted[me]}
            constraints={{
              video: true,
              audio: true,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Qora;

type VideoRefsType = Record<string, HTMLDivElement>;
