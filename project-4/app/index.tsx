import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';

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
  const [count, setCount] = useState(1);

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
              toggleChat={() => setIsChatOpen(!isChatOpen)}
            />
          </div>
        </div>

        <div
          className={`${
            isChatOpen ? '' : 'hidden'
          } h-screen w-screen max-w-full sm:max-w-md`}
        >
          <Chat onClose={() => setIsChatOpen(false)} title="Item Details" />
        </div>
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
