import { memo, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { MediaConnection } from 'peerjs';
import { toast, ToastContainer } from 'react-toastify';

import { KeyValue, Nullable, RoomId } from '@common/types';
import { isHost, syncSession } from '@common/utils';
import {
  FAILURE_MSG,
  MYSELF,
  PEER_LOADING_MSG,
  TOAST_PROPS,
} from '@common/constants';
import LoaderError from '@common/components/loader-error';

import { useMediaStream, usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Room from '@components/botqa';
import {
  Chat,
  ControlPanel,
  PeerVideo,
  VideoContainer as MyVideoContainer,
} from '@components/index';
import useSessionStorage from '@hooks/use-session-storage';

export default ({ stream }: { stream: MediaStream }) => {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const { name, picture: avatar } = useUser().user!;
  const { muted, visible, toggle } = useMediaStream({ stream });
  const { peer, me, isLoading } = usePeer({ muted, visible });

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});
  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  // * side features - chat, fullscreen, users' statuses 💬 📺 👥
  const [chat, setChat] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    syncSession().persist('me', { avatar, name, muted, visible });

    return () => {
      sessionStorage.clear();
      peer?.destroy();
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <LoaderError msg={PEER_LOADING_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  function toggleKind(kind: 'audio' | 'video' | 'chat' | 'fullscreen') {
    if (kind == 'fullscreen') setFullscreen(!fullscreen);
    else if (kind == 'chat') setChat(!chat);
    else {
      toggle(kind)();
      socket.emit(`user:toggle-${kind}`, me);
    }
  }

  return (
    <QoraContext.Provider
      value={{
        peer,
        me,
        isHost: isHost(router.query.qoraId as RoomId),
        stream,
        peers,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex">
        <div className="flex w-full h-screen flex-col p-4">
          <Room
            fullscreen={fullscreen}
            stream={stream}
            onHostMute={() => {
              toggle('audio')();
              syncSession().swapBool('muted')('me');
              toast('You are muted by organiser');
            }}
            onHostRemove={() => {
              router.push('/');
              toast('You are removed from the meeting by organiser');
            }}
          >
            <MyVideoContainer
              id={me}
              stream={stream}
              muted={muted}
              visible={visible}
              avatar={avatar}
            >
              <PeerVideo stream={stream} name={MYSELF} isMe />
            </MyVideoContainer>
          </Room>

          <ControlPanel
            muted={muted}
            visible={visible}
            chat={chat}
            onLeave={() => router.push('/')}
            onToggle={toggleKind}
          />

          <div className="hidden h-screen w-screen max-w-full sm:max-w-md">
            <Chat onClose={() => setChat(false)} title="Meeting Chat" />
          </div>
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};
