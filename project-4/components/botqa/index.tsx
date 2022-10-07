import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import { useUserJoin, useUserAnswer } from '@hooks/index';
import { append, toggleAudio } from 'common/utils';
import { KeyValue, PeerId } from 'common/types';
import { SocketContext } from '@pages/_app';
import { useRouter } from 'next/router';
import { UserStateContext, UserUpdaterContext } from '@app/*';

const Room = ({ fullscreen, onMuteUser, children }: RoomProps) => {
  console.log('render app');
  const socket = useContext(SocketContext);
  const router = useRouter();

  const {
    myId,
    peers,
    stream,
    setCount,
    sharedScreenTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);

  const { setIsMuted, setIsHidden } = useContext(UserUpdaterContext);
  const { isMuted, isHidden, avatar } = useContext(UserStateContext);

  const [videos, setVideos] = useState<Record<PeerId, JSX.Element>>({});

  const videosEntries = Object.entries(videos);
  setCount(videosEntries.length);

  useUserJoin(addVideoStream);
  useUserAnswer(addVideoStream);

  useEffect(() => {
    socket.on('host:muted-user', mutedByHost);

    socket.on('user:left', (peerId: PeerId) => {
      if (myId === peerId) router.push('/');
      else {
        delete videos[peerId];
        setVideos(videos);
        peers[peerId]?.close();
      }
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
    delete videos[peerId];
    setVideos(videos);
    peers[peerId]?.close();
  }

  function mutePeer(peerId: string) {
    setIsMuted(append({ [peerId]: true }));
    socket.emit('host:mute-user', peerId);
  }

  return (
    <>
      <div className="flex gap-4">
        {sharedScreenTrack && (
          <div
            className={`flex justify-center ${
              fullscreen ? 'basis-6/6' : 'basis-5/6'
            }`}
          >
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
              userPicture={avatar[id]}
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
      onMuteUser();
      toast('You are muted');
    } else {
      setIsMuted(append({ [peerId]: true }));
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
