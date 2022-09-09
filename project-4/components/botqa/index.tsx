import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import { usePeerOnJoinRoom, usePeerOnAnswer } from '@hooks/index';
import { append, toggleAudio } from 'common/utils';
import { KeyValue } from 'common/types';

const Botqa = ({
  amIMuted,
  fullscreen,
  setAmIMuted,
  children,
}: {
  amIMuted: boolean;
  fullscreen: boolean;
  setAmIMuted: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  console.log('render app');

  const {
    peer,
    myId,
    peers,
    stream,
    socket,
    sharedScreenTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);

  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [isRemoved, setIsRemoved] = useState<KeyValue<boolean>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  usePeerOnJoinRoom(addVideoStream, amIMuted, setIsMuted);
  usePeerOnAnswer(addVideoStream, setIsMuted);

  useEffect(() => {
    socket.on('host:muted-user', (peerId: string) => {
      if (peerId === myId) {
        toggleAudio(stream);
        setAmIMuted(true);
        toast('You are muted');
      } else {
        setIsMuted((prev) => ({ ...prev, [peerId]: true }));
      }
    });

    socket.on('user:left', (peerId: string) => {
      peers[peerId]?.close();
      setIsRemoved((prev) => ({ ...prev, [peerId]: true }));
    });

    socket.on('user:toggled-audio', (peerId: string) => {
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
    });

    return () => {
      socket.off('host:muted-user');
      socket.off('user:left');
      socket.off('user:toggled-audio');
    };
  }, [peers, myId]);

  function addVideoStream({
    id,
    name,
    isMe,
  }: {
    id: string;
    name: string;
    isMe?: boolean;
  }) {
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

  function handleRemovePeer(peerId: string) {
    socket.emit('user:leave', peerId);
    peers[peerId]?.close();
  }

  function handleMutePeer(peerId: string) {
    socket.emit('host:mute-user', peerId);
    setIsMuted((prev) => ({ ...prev, [peerId]: true }));
  }

  if (!peer || !stream) return <span>Loading...</span>;

  let sharedScreenClasses = '';
  if (sharedScreenTrack) {
    sharedScreenClasses += 'flex justify-center';
    if (fullscreen) sharedScreenClasses += 'basis-6/6';
    else sharedScreenClasses += 'basis-5/6';
  }

  return (
    <>
      <div className="flex gap-4">
        <div className={sharedScreenClasses}>
          <SharedScreen sharedScreenTrack={sharedScreenTrack} />
        </div>

        <div
          className={`${
            fullscreen && sharedScreenTrack ? 'hidden' : ''
          } flex flex-wrap gap-4 justify-around ${
            sharedScreenTrack ? 'basis-1/6' : ''
          }`}
        >
          {children}
          {Object.entries(videos).map(
            ([id, element]) =>
              !isRemoved[id] && (
                <VideoContainer
                  key={id}
                  id={id}
                  isMuted={isMuted[id]}
                  onMutePeer={handleMutePeer}
                  onRemovePeer={handleRemovePeer}
                >
                  {element}
                </VideoContainer>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Botqa;
