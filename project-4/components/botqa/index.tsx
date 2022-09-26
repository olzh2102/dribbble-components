import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import { useUserJoin, useUserAnswer, useMediaStream } from '@hooks/index';
import { append, syncSession, toggleAudio } from 'common/utils';
import { KeyValue, PeerId } from 'common/types';
import { SocketContext } from '@pages/_app';
import useSessionStorage from '@hooks/use-session-storage';

const Botqa = ({ onHostMute, children }: any) => {
  console.log('render app');

  const socket = useContext(SocketContext);
  const { me, peers } = useContext(QoraContext);

  const [videos, setVideos] = useState<Record<PeerId, JSX.Element>>({});

  useUserJoin(appendStream);
  useUserAnswer(appendStream);

  const [session, setSession] = useSessionStorage();

  useEffect(() => {
    socket.on('host:muted-user', (id: PeerId) => {
      if (id == me) {
        onHostMute();
        toast('You are muted by organiser');
      } else setSession('muted')(id);
    });

    socket.on('user:left', (peerId: PeerId) => {
      console.log('am I emitted? ', peerId);
      console.log('videos', videos);
      if (peerId in peers) {
        peers[peerId].close();
        setVideos((oldVideos) => {
          console.log('did this shit work?');
          delete oldVideos[peerId];
          return oldVideos;
        });
        sessionStorage.removeItem(peerId);
      }
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
    return (stream: MediaStream) =>
      setVideos(
        append({
          [id]: <PeerVideo stream={stream} name={name} isMe={isMe} />,
        })
      );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-around">
      {children}
      {Object.entries(videos).map(([id, video]) => (
        <VideoContainer
          id={id}
          key={id}
          muted={session[id].muted}
          visible={session[id].visible}
          avatar={session[id].avatar || ''}
          stream={video.props.stream}
          onHostMute={(id: PeerId) => {
            setSession('muted')(id);
            socket.emit('host:mute-user', id);
          }}
          onHostRemove={(id: PeerId) => {
            socket.emit('user:leave', id);
            peers[id].close();
            setVideos((oldVideos) => {
              console.log('did this shit work?');
              delete oldVideos[id];
              return oldVideos;
            });
          }}
        >
          {video}
        </VideoContainer>
      ))}
    </div>
  );
};

export default Botqa;
