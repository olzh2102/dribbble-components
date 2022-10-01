import { useContext, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { MediaConnection } from 'peerjs';
import { ToastContainer } from 'react-toastify';

import { MediaSetup, KeyValue, Nullable, RoomId } from '@common/types';
import { append, isHost } from '@common/utils';
import {
  FAILURE_MSG,
  LOADER_PEER_MSG,
  MYSELF,
  TOAST_PROPS,
} from '@common/constants';

import { usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Botqa from '@components/botqa';
import Chat from '@components/chat';
import ControlPanel from '@components/control-panel';
import { PeerVideo, VideoContainer } from '@components/index';
import LoaderError from '@common/components/loader-error';

const Room = ({
  stream,
  initMediaSetup,
}: {
  stream: MediaStream;
  initMediaSetup: MediaSetup;
}) => {
  const router = useRouter();
  const userPicture = useUser().user!.picture;
  const socket = useContext(SocketContext);
  const { peer, myId, isPeerReady } = usePeer(initMediaSetup);

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  const [mediaSetup, setMediaSetup] = useState(initMediaSetup);
  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatClassName, setChatClassName] = useState<
    'hidden' | 'animate-on-open-chat' | 'animate-on-close-chat' | null
  >(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!chatClassName) setChatClassName('hidden');
    else
      setChatClassName(
        isChatOpen ? 'animate-on-open-chat' : 'animate-on-close-chat'
      );
  }, [isChatOpen]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  return (
    <QoraContext.Provider
      value={{
        peer,
        myId,
        isHost: isHost(router.query.qoraId as RoomId),
        mediaSetup,
        stream,
        peers,
        setCount,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex">
        <div
          className={`${
            isChatOpen ? 'sm:flex hidden' : 'flex'
          } w-full h-screen flex-col p-4`}
        >
          <div className="flex h-full place-items-center place-content-center">
            <Botqa
              onMuteUser={() => setMediaSetup(append({ isMuted: true }))}
              fullscreen={fullscreen}
            >
              <VideoContainer
                id={myId}
                mediaSetup={mediaSetup}
                stream={stream}
                userPicture={userPicture || ''}
              >
                <PeerVideo stream={stream} name={MYSELF} isMe={true} />
              </VideoContainer>
            </Botqa>
          </div>

          <div className="flex w-full items-center">
            <ControlPanel
              onLeave={() => router.push('/')}
              isChatOpen={isChatOpen}
              usersCount={count + Number(Boolean(myId))}
              onFullscreen={() => setFullscreen(!fullscreen)}
              setMediaSetup={(key: keyof MediaSetup) =>
                setMediaSetup(append({ [key]: !mediaSetup[key] }))
              }
              toggleChat={setIsChatOpen}
            />
          </div>
        </div>

        <div
          className={`${chatClassName} h-screen w-screen max-w-full sm:max-w-md`}
        >
          <Chat onClose={() => setIsChatOpen(false)} title="Meeting Chat" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default Room;
