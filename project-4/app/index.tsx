import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MutedIcon } from '../assets/icons';
import { toggleAudio } from '../common/utils';
import { ControlPanel, HostControlPanel, PeerVideo } from '../components';
import Chat from '../components/chat';

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
  const [isHeadlessOpen, setIsHeadlessOpen] = useState(false);

  console.log('render app');
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
        const stream: any = (videoRefs[userId].children[0] as HTMLVideoElement)
          .srcObject;
        toggleAudio(stream);
        setIsMuted((prev) => ({ ...prev, [userId]: true }));
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
  }, [videoRefs]);

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });
  usePeerOnLeftRoom({ peers, videoRefs });

  function handleMutePeer(id: string, name: string) {
    socket.emit('mute-peer', {
      userId: id,
      username: name,
    });
    setIsMuted((prev) => ({ ...prev, [id]: true }));
  }

  function handleRemovePeer(id: string) {
    socket.emit('remove-peer', id);
    peers[id]?.close();
    videoRefs[id]?.remove();
  }

  function handleAudio() {
    socket.emit('toggle-audio-status', me);
    setIsMuted((prev) => ({ ...prev, [me]: !prev[me] }));
    if (stream) toggleAudio(stream);
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
                    onRemovePeer={() => handleRemovePeer(id)}
                    onMutePeer={() =>
                      handleMutePeer(id, element.props.children.props.name)
                    }
                    isMuted={isMuted[id]}
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
            isMuted={isMuted[me]}
            stream={stream}
            onAudio={handleAudio}
            constraints={{
              video: true,
              audio: true,
            }}
          />

          <button onClick={() => setIsHeadlessOpen(!isHeadlessOpen)}>
            show chat
          </button>

          <Chat
            open={isHeadlessOpen}
            setOpen={setIsHeadlessOpen}
            title="Item Details"
          >
            chat will be here
          </Chat>
        </>
      )}
    </>
  );
};

export default App;

export type KeyValue<T> = Record<string, T>;
