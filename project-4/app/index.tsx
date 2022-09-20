import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';

import { InitSetup, KeyValue, Nullable } from '@common/types';
import { isHost, toggleAudio } from '@common/utils';
import { MYSELF, TOAST_PROPS } from '@common/constants';

import { useGetRoomId, usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Botqa from '@components/botqa';
import Chat from '@components/chat';
import ControlPanel from '@components/control-panel';
import { PeerVideo, VideoContainer } from '@components/index';

const App = ({ stream, initSetup }: { stream: MediaStream; initSetup: InitSetup }) => {
  const socket = useContext(SocketContext);
  const roomId = useGetRoomId();

  const { peer, myId } = usePeer(initSetup.isMuted);
  const { isLoading, user } = useUser();

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  const [amIMuted, setAmIMuted] = useState(initSetup.isMuted);
  const [sharedScreenTrack, setSharedScreenTrack] = useState<Nullable<MediaStreamTrack>>(null);

  const [fullscreen, setFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatClassName, setChatClassName] = useState<
    'hidden' | 'animate-on-open-chat' | 'animate-on-close-chat' | null
  >(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (!chatClassName) setChatClassName('hidden');
    else setChatClassName(isChatOpen ? 'animate-on-open-chat' : 'animate-on-close-chat');
  }, [isChatOpen]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleAudio() {
    toggleAudio(stream);
    setAmIMuted(!amIMuted);
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
        <div className={`${isChatOpen ? 'sm:flex hidden' : 'flex'} w-full h-screen flex-col p-4`}>
          {!peer ? (
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
              onAudio={handleAudio}
              onFullscreen={() => setFullscreen(!fullscreen)}
              toggleChat={() => setIsChatOpen(!isChatOpen)}
              usersCount={count + Number(Boolean(myId))}
            />
          </div>
        </div>

        <div className={`${chatClassName} h-screen w-screen max-w-full sm:max-w-md`}>
          <Chat onClose={() => setIsChatOpen(false)} title="Meeting Chat" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default App;
