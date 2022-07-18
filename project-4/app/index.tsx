import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MutedIcon } from '../assets/icons';
import { ControlPanel, HostControlPanel, PeerVideo } from '../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  usePeerOnLeftRoom,
  useGetRoomId,
} from '../hooks';
import { SocketContext } from '../pages/qora/[qoraId]';

const App = () => {
  console.log('render app');
  const router = useRouter();
  const roomId = useGetRoomId();
  const socket = useContext(SocketContext);
  const peer = useCreatePeer();

  const me = useOnOpenPeer(peer);
  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

  const [videoRefs, setVideoRefs] = useState<KeyValue<HTMLDivElement>>({});
  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [peers, setPeers] = useState<KeyValue<any>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  const stream = useCreateVideoStream({
    video: true,
    audio: true,
  });

  useEffect(() => {
    if (!stream) return;
    me && addVideoStream({ id: me, stream, isMe: true });
  }, [me]);

  useEffect(() => {
    socket.on(
      'member-muted',
      ({ userId, username }: { userId: string; username: string }) => {
        if (!videoRefs[userId]) return;

        if (userId === me) toggle('audio', userId);
        toast(`${username} is muted`);
      }
    );

    socket.on('audio-status-toggled', (peerId) => {
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
    });

    return () => {
      socket.off('member-muted');
      socket.off('audio-status-toggled');
    };
  }, [Object.keys(videoRefs).length]);

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });
  usePeerOnLeftRoom({ peers, videoRefs });

  function toggle(type: 'audio' | 'video', peerId = me) {
    const stream: any = (videoRefs[peerId].children[0] as HTMLVideoElement)
      .srcObject;

    const tracks =
      type === 'video' ? stream.getTracks() : stream.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    track.enabled = !track.enabled;

    if (type === 'audio')
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
  }

  function handleRemovePeer(id: string) {
    socket.emit('remove-peer', id);
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

  return (
    <>
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
                    onHangUp={() => handleRemovePeer(id)}
                    onToggleAudio={() => {
                      socket.emit('mute-peer', {
                        userId: id,
                        username: element.props.children.props.name,
                      });
                      setIsMuted((prev) => ({ ...prev, [id]: !prev[id] }));
                    }}
                    isMuted={isMuted[id]}
                  />
                )}

                {isMuted[id] && (
                  <>
                    <div className="absolute top-3 right-3">
                      <MutedIcon />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <ControlPanel
            onVideo={() => toggle('video')}
            onAudio={() => {
              socket.emit('toggle-audio-status', me);
              toggle('audio', me);
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
    </>
  );
};

export default App;

export type KeyValue<T> = Record<string, T>;
