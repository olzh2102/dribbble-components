import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MutedIcon } from '../assets/icons';
import { toggleAudio } from '../common/utils';
import {
  ControlPanel,
  HostControlPanel,
  PeerVideo,
  SharedScreen,
} from '@components/index';

import {
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  usePeerOnLeftRoom,
} from '@hooks/index';
import { QoraContext } from '@pages/qora/[qoraId]';

const App = () => {
  console.log('render app');

  const { socket, peer, stream, isHost, me, peers } = useContext(QoraContext);

  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [videoRefs, setVideoRefs] = useState<KeyValue<HTMLDivElement>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<MediaStreamTrack | null>(null);

  useEffect(() => {
    if (!stream) return;
    if (me) addVideoStream({ id: me, stream, isMe: true });
  }, [me]);

  useEffect(() => {
    socket.on(
      'member-muted',
      ({ userId, username }: { userId: string; username: string }) => {
        if (!videoRefs[userId]) return;
        const stream = (videoRefs[userId].children[0] as HTMLVideoElement)
          .srcObject as MediaStream;
        toggleAudio(stream);
        setIsMuted((prev) => ({ ...prev, [userId]: true }));
        toast(`${username} is muted`);
      }
    );

    socket.on('audio-status-toggled', (peerId: any) => {
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
    });

    return () => {
      socket.off('member-muted');
      socket.off('audio-status-toggled');
    };
  }, [videoRefs]);

  usePeerOnJoinRoom(addVideoStream);
  usePeerOnAnswer(addVideoStream);
  usePeerOnLeftRoom(videoRefs);

  function handleMutePeer(id: string, name: string) {
    socket.emit('mute-peer', {
      userId: id,
      username: name,
    });
    setIsMuted((prev) => ({ ...prev, [id]: true }));
  }

  function handleRemovePeer(id: string) {
    socket.emit('remove-peer', id);
    peers[id].close();
    videoRefs[id].remove();
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

    const screenTrack = stream.getVideoTracks()[1];
    if (screenTrack) setSharedScreenTrack(screenTrack);
  }

  if (!peer || !stream) return <span>Loading...</span>;

  return (
    <>
      <div className="flex gap-4 items-start w-full">
        {/* shared screen stream video */}
        <div
          className={`${
            sharedScreenTrack ? 'basis-5/6 flex justify-center' : ''
          }`}
        >
          <SharedScreen sharedScreenTrack={sharedScreenTrack} />
        </div>

        {/* peer stream videos */}
        <div
          className={`flex flex-wrap gap-4 justify-around ${
            sharedScreenTrack ? 'basis-1/6' : ''
          }`}
        >
          {Object.entries(videos).map(([id, element]) => (
            <div key={id} className="relative group h-fit">
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
      </div>
      <ControlPanel
        isMuted={isMuted[me]}
        sharedScreenTrack={sharedScreenTrack}
        onAudio={handleAudio}
        setSharedScreenTrack={setSharedScreenTrack}
      />
    </>
  );
};

export default App;

export type KeyValue<T> = Record<string, T>;
