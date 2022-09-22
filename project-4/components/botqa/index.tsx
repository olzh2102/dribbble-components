import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import { usePeerOnJoinRoom, usePeerOnAnswer } from '@hooks/index';
import { append, toggleAudio } from 'common/utils';
import { KeyValue, PeerId } from 'common/types';

const Room = ({ fullscreen, onMuteUser, children }: RoomProps) => {
  console.log('render app');

  const {
    myId,
    peers,
    stream,
    socket,
    setCount,
    sharedScreenTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);

  const [videos, setVideos] = useState<Record<PeerId, JSX.Element>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});

  const videosEntries = Object.entries(videos);
  setCount(videosEntries.length);

  usePeerOnJoinRoom(addVideoStream, setIsMuted, setIsHidden);
  usePeerOnAnswer(addVideoStream, setIsMuted, setIsHidden);

  useEffect(() => {
    socket.on('host:muted-user', mutedByHost);

    socket.on('user:left', (peerId: PeerId) => {
      peers[peerId]?.close();
      delete videos[peerId];
      setVideos(videos);
    });

    socket.on('user:toggled-audio', (peerId: PeerId) =>
      setIsMuted(append({ [peerId]: !isMuted[peerId] }))
    );

    socket.on('user:toggled-video', (peerId: PeerId) =>
      setIsHidden(append({ [peerId]: !isHidden[peerId] }))
    );

    return () => {
      socket.off('host:muted-user');
      socket.off('user:left');
      socket.off('user:toggled-audio');
      socket.off('user:toggled-video');
    };
  }, [peers, myId, isMuted, isHidden]);

  function removePeer(peerId: string) {
    socket.emit('user:leave', peerId);
    peers[peerId]?.close();
  }

  function mutePeer(peerId: string) {
    setIsMuted(append({ [peerId]: true }));
    socket.emit('host:mute-user', peerId);
  }

  let sharedScreenClasses = 'flex justify-center';
  if (fullscreen) sharedScreenClasses += 'basis-6/6';
  else sharedScreenClasses += 'basis-5/6';

  return (
    <>
      <div className="flex gap-4">
        {sharedScreenTrack && (
          <div className={sharedScreenClasses}>
            <SharedScreen sharedScreenTrack={sharedScreenTrack} />
          </div>
        )}

        <div
          className={`${
            fullscreen && sharedScreenTrack ? 'hidden' : ''
          } flex flex-wrap gap-4 justify-around ${
            sharedScreenTrack ? 'basis-1/6' : ''
          }`}
        >
          {children}

          {videosEntries.map(([id, element]) => (
            <VideoContainer
              id={id}
              mediaSetup={{ isMuted: isMuted[id], isHidden: isHidden[id] }}
              stream={element.props.stream}
              onMutePeer={mutePeer}
              onRemovePeer={removePeer}
            >
              {element}
            </VideoContainer>
          ))}
        </div>
      </div>
    </>
  );

  // ********************************

  function mutedByHost(peerId: PeerId) {
    if (peerId === myId) {
      toggleAudio(stream);
      onMuteUser();
      toast('You are muted');
    } else {
      setIsMuted((prev) => ({ ...prev, [peerId]: true }));
    }
  }

  function addVideoStream({ id, name, isMe }: AppendVideoStream) {
    return (stream: MediaStream) => {
      setVideos(
        append({
          [id]: <PeerVideo stream={stream} name={name} isMe={isMe} />,
        })
      );

      const [_, screenTrack] = stream.getVideoTracks();
      if (screenTrack) setSharedScreenTrack(screenTrack);
    };
  }
};

export default Room;

type RoomProps = {
  fullscreen: boolean;
  onMuteUser: () => void;
  children: React.ReactNode;
};

type AppendVideoStream = {
  id: PeerId;
  name: string;
  isMe?: boolean;
};
