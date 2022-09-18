import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';
import { XIcon } from '@heroicons/react/outline';

import { KeyValue, Nullable } from '@common/types';
import { isHost, toggleAudio } from '@common/utils';
import { MYSELF, TOAST_PROPS } from '@common/constants';

import { useGetRoomId, usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Botqa from '@components/botqa';
import Chat from '@components/chat';
import ControlPanel from '@components/control-panel';
import { PeerVideo, VideoContainer } from '@components/index';

const App = ({ stream, media }: AppProps) => {
  const socket = useContext(SocketContext);
  const roomId = useGetRoomId();
  const { peer, myId } = usePeer(media.isMuted);
  const { isLoading, user } = useUser();

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  const [amIMuted, setAmIMuted] = useState(media.isMuted);
  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isStatusSectionOpen, setIsStatusSectionOpen] = useState(false);
  const [chatClassName, setChatClassName] = useState<any>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!chatClassName) setChatClassName('hidden');
    else
      setChatClassName(
        isChatOpen || isStatusSectionOpen
          ? 'animate-on-open-chat'
          : 'animate-on-close-chat'
      );
  }, [isChatOpen, isStatusSectionOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chatClassName == 'animate-on-close-chat') setChatClassName('hidden');
    }, 600);
    return () => clearTimeout(timer);
  }, [chatClassName]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleAudio() {
    setAmIMuted(!amIMuted);
    if (stream) toggleAudio(stream);

    socket.emit('user:toggle-audio', myId);
  }

  if (isLoading) return <span>Loading...</span>;

  return (
    <QoraContext.Provider
      value={{
        socket,
        roomId,
        peer,
        myId,
        user,
        isHost: isHost(roomId),
        amIMuted,
        isChatOpen,
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
          {!stream || !peer ? (
            <span className="text-white">Getting the room ready...</span>
          ) : (
            <div className="flex h-full place-items-center place-content-center">
              <Botqa setAmIMuted={setAmIMuted} fullscreen={fullscreen}>
                <VideoContainer id={myId} isMuted={amIMuted} stream={stream}>
                  <PeerVideo stream={stream} name={MYSELF} isMe={true} />
                </VideoContainer>
              </Botqa>
            </div>
          )}

          <div className="flex w-full items-center">
            <ControlPanel
              usersCount={count + Number(Boolean(myId))}
              onFullscreen={() => setFullscreen(!fullscreen)}
              onAudio={handleAudio}
              toggleChat={() => {
                setIsChatOpen(!isChatOpen);
                setIsStatusSectionOpen(false);
              }}
              toggleParticipants={() => {
                setIsStatusSectionOpen(!isStatusSectionOpen);
                setIsChatOpen(false);
              }}
            />
          </div>
        </div>

        <div
          className={`${chatClassName} h-screen w-screen max-w-full sm:max-w-md`}
        >
          <div className="h-full bg-[#1e262e] text-gray-300 shadow-xl rounded-l-3xl">
            <div className="flex flex-col pl-6 py-6 h-full justify-between">
              <div className="flex justify-between mr-6 mb-3">
                <h2 className="text-lg font-medium text-gray-300">
                  {isChatOpen ? 'Meeting Chat' : 'People'}
                </h2>
                <button
                  className="text-gray-300 hover:text-white focus:outline-none"
                  onClick={() => {
                    if (isChatOpen) setIsChatOpen(false);
                    if (isStatusSectionOpen) setIsStatusSectionOpen(false);
                  }}
                >
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {isChatOpen && (
                <Chat
                  onClose={() => setIsChatOpen(false)}
                  title="Meeting Chat"
                />
              )}
              {isStatusSectionOpen && (
                <span>here will be participants' statuses</span>
              )}
            </div>
          </div>
        </div>

        {/* <div
          className={`${chatClassName} h-screen w-screen max-w-full sm:max-w-md`}
        >
          <span>Hey</span>
        </div> */}
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default App;

type AppProps = {
  stream: Nullable<MediaStream>;
  media: { isMuted: boolean; isVisible: boolean };
};

type SideSectionCSSClass =
  | 'hidden'
  | 'animate-on-open-chat'
  | 'animate-on-close-chat'
  | null;
