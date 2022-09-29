import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import { useUserJoin, useUserAnswer, useMediaStream } from '@hooks/index';
import { append, syncSession, toggleAudio } from 'common/utils';
import { KeyValue, PeerId } from 'common/types';
import { SocketContext } from '@pages/_app';
import useSessionStorage from '@hooks/use-session-storage';

const Botqa = ({ onHostMute, onHostRemove, fullscreen, children }: any) => {
  console.log('render app');

  const socket = useContext(SocketContext);
  const { me, peers, sharedScreenTrack, setSharedScreenTrack } =
    useContext(QoraContext);

  const [videos, setVideos] = useState<Record<PeerId, JSX.Element>>({});

  const [session, setSession, removeFromSession, addToSession] =
    useSessionStorage();

  useUserJoin(appendStream, addToSession);
  useUserAnswer(appendStream, addToSession);

  useEffect(() => {
    socket.on('host:muted-user', (id: PeerId) => {
      if (id == me) onHostMute();
      else setSession('muted')(id);
    });

    socket.on('user:left', (peerId: PeerId) => {
      if (me == peerId) {
        onHostRemove();
      } else if (peers[peerId]) {
        peers[peerId].close();

        const copy = Object.assign({}, videos);
        delete copy[peerId];
        setVideos(copy);
      }

      removeFromSession(peerId);
    });

    socket.on('user:toggled-audio', setSession('muted'));
    socket.on('user:toggled-video', setSession('visible'));

    return () => {
      socket.off('host:muted-user');
      socket.off('user:left');
      socket.off('user:toggled-audio');
      socket.off('user:toggled-video');
    };
  }, [peers, me]);

  function appendStream({ id, name, isMe }: any) {
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

  function muteByHost(id: PeerId) {
    setSession('muted')(id);
    socket.emit('host:mute-user', id);
  }

  function removeByHost(id: PeerId) {
    // * tell others to remove from their tab
    socket.emit('user:leave', id);

    // * remove from my tab
    peers[id].close();
    const copy = Object.assign({}, videos);
    delete copy[id];
    setVideos(copy);
  }

  let sharedScreenClasses = 'flex justify-center';
  if (fullscreen) sharedScreenClasses += 'basis-6/6';
  else sharedScreenClasses += 'basis-5/6';

  return (
    <div className="flex h-full place-items-center place-content-center">
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
        {Object.entries(videos).map(([id, video]) => (
          <VideoContainer
            id={id}
            key={id}
            muted={session[id]?.muted || false}
            visible={session[id]?.visible || true}
            avatar={session[id]?.avatar || ''}
            stream={video.props.stream}
            onHostMute={muteByHost}
            onHostRemove={removeByHost}
          >
            {video}
          </VideoContainer>
        ))}
      </div>
    </div>
  );
};

export default Botqa;
