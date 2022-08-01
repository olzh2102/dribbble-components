import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { MutedIcon } from '../assets/icons';
import { toggleAudio } from 'common/utils';
import { KeyValue, Nullable } from 'common/types';
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

  const { socket, peer, user, stream, isHost, me, peers } =
    useContext(QoraContext);

  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [videoRefs, setVideoRefs] = useState<KeyValue<HTMLDivElement>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  const [isMyScreenSharing, setIsMyScreenSharing] = useState(false);

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

    socket.on('audio-status-toggled', (peerId: string) => {
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
    name = '',
    stream,
    isMe = false,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
    isMe: boolean;
  }) {
    // stream.getVideoTracks()[0].enabled = false;
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

  useEffect(() => {
    socket.on('screen-shared', (username: string) => {
      peer.disconnect();
      peer.reconnect();
      toast(`${username} is sharing his screen`);
    });

    socket.on('screen-sharing-stopped', () => {
      setSharedScreenTrack(null);
    });

    socket.on('shared-video-removed', () => {
      const sharedScreenTrack = stream?.getVideoTracks()[1];
      if (sharedScreenTrack) stopShareScreen(sharedScreenTrack);
    });

    return () => {
      socket.off('screen-shared');
      socket.off('screen-sharing-stopped');
      socket.off('shared-video-removed');
    };
  }, [peer]);

  function stopShareScreen(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream?.removeTrack(screenTrack);
    setSharedScreenTrack(null);
    setIsMyScreenSharing(false);
    socket.emit('stop-sharing-my-screen');
  }

  async function handleShareScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const screenTrack = screenStream.getTracks()[0];
    stream?.addTrack(screenTrack);
    setSharedScreenTrack(screenTrack);
    setIsMyScreenSharing(true);

    socket.emit('share-my-screen', { username: user?.name });

    screenTrack.onended = () => stopShareScreen(screenTrack);
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
        isMyScreenSharing={isMyScreenSharing}
        isHost={isHost}
        stream={stream}
        onAudio={handleAudio}
        onShareScreen={handleShareScreen}
        onStopShareScreen={stopShareScreen}
        constraints={{
          video: true,
          audio: true,
        }}
      />
    </>
  );
};

export default App;
