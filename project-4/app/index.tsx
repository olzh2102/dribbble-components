import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { MediaConnection } from 'peerjs';
import { ToastContainer } from 'react-toastify';

import { MediaSetup, KeyValue, Nullable, RoomId } from '@common/types';
import { append, isHost } from '@common/utils';
import { MYSELF, TOAST_PROPS } from '@common/constants';

import { useMediaStream, usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Botqa from '@components/botqa';
import Chat from '@components/chat';
import ControlPanel from '@components/control-panel';
import { PeerVideo, VideoContainer } from '@components/index';

const Room = ({
  stream,
  isMuted,
  isHidden,
}: {
  stream: MediaStream;
  isMuted: boolean;
  isHidden: boolean;
}) => {
  const room = useRouter().query.qoraId as RoomId;
  const socket = useContext(SocketContext);
  const { peer, myId, isLoading } = usePeer({ isMuted, isHidden });
  const { toggle } = useMediaStream({ stream, muted: isMuted, visible: !isHidden });

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({ myId: peer });

  const [sharedScreenTrack, setSharedScreenTrack] = useState<Nullable<MediaStreamTrack>>(null);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading)
    return <div className="grid place-items-center h-screen text-white">Setting you up... 🎮</div>;

  if (!peer)
    return (
      <div className="grid place-items-center h-screen text-white">
        Oooops!!! Couldn't create connection. Try again later 🫠
      </div>
    );

  return (
    <QoraContext.Provider
      value={{
        socket,
        peer,
        myId,
        isHost: isHost(room),
        mediaSetup: setup,
        stream,
        peers,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex">
        <div className={`${false ? 'sm:flex hidden' : 'flex'} w-full h-screen flex-col p-4`}>
          <div className="flex h-full place-items-center place-content-center">
            <Botqa
              onHostMute={() => {}}
              onMuteUser={() => setMediaSetup(append({ isMuted: true }))}
              fullscreen={false}
            >
              <VideoContainer
                id={myId}
                mediaSetup={setup}
                stream={stream}
                userPicture={avatar || ''}
              >
                <PeerVideo stream={stream} name={MYSELF} isMe={true} />
              </VideoContainer>
            </Botqa>
          </div>

          {/* <div className="flex w-full items-center">
            <ControlPanel
              mediaSetup={setup}
              onToggle={(kind: 'audio' | 'video') => {
                toggle(kind)(stream);
                socket.emit('user:toggle-' + kind, myId);
              }}
              isChatOpen={false}
              usersCount={1 + Number(Boolean(myId))}
              onFullscreen={() => {}}
              toggleChat={() => {}}
            />
          </div> */}
        </div>

        <div className={`${null} h-screen w-screen max-w-full sm:max-w-md`}>
          <Chat onClose={() => {}} title="Meeting Chat" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default Room;
