import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

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
        stream,
        peers,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex">
        <div
          className={`${
            isChatOpen ? 'sm:flex hidden' : 'flex'
          } h-screen w-full place-items-center place-content-center relative p-6`}
        >
          {!stream || !peer ? (
            <span className="text-white">Getting the room ready...</span>
          ) : (
            <Botqa setAmIMuted={setAmIMuted} fullscreen={fullscreen}>
              <VideoContainer id={myId} isMuted={amIMuted} stream={stream}>
                <PeerVideo stream={stream} name={MYSELF} isMe={true} />
              </VideoContainer>
            </Botqa>
          )}

          <div className="flex w-full absolute bottom-6 items-center z-50">
            <ControlPanel
              onFullscreen={() => setFullscreen(!fullscreen)}
              onAudio={handleAudio}
              toggleChat={() => setIsChatOpen(!isChatOpen)}
            />
          </div>
        </div>

        {isChatOpen && (
          <div className="h-screen">
            <Chat onClose={() => setIsChatOpen(false)} title="Item Details" />
          </div>
        )}
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
