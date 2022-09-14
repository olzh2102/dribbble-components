import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import { SocketContext } from '@pages/_app';
import Botqa from '@components/botqa';
import Chat from '@components/chat';
import { useGetRoomId, usePeer } from '@hooks/index';
import { KeyValue, Nullable } from '@common/types';
import { QoraContext } from '@pages/qora/[qoraId]';
import ControlPanel from '@components/control-panel';
import { toggleAudio } from '@common/utils';
import { PeerVideo, VideoContainer } from '@components/index';
import { MYSELF } from '@common/constants';

const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};

const App = ({
  stream,
  media,
}: {
  stream: Nullable<MediaStream>;
  media: { isMuted: boolean; isVisible: boolean };
}) => {
  const socket = useContext(SocketContext);
  const roomId = useGetRoomId();
  const { peer, myId } = usePeer(media.isMuted);
  const user = useUser();
  console.log('ME', myId);
  console.log('PEER:', peer);

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  const [amIMuted, setAmIMuted] = useState(media.isMuted);
  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  const [fullscreen, setFullscreen] = useState(false);

  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

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

  if (user.isLoading) return <span>Loading...</span>;

  if (typeof window !== 'undefined' && !user.user)
    window.location.href = '/api/auth/login';

  return (
    <QoraContext.Provider
      value={{
        socket,
        roomId,
        peer,
        myId,
        user: user.user,
        isHost,
        stream,
        peers,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex h-screen place-items-center place-content-center relative p-6">
        <Botqa
          amIMuted={amIMuted}
          setAmIMuted={setAmIMuted}
          fullscreen={fullscreen}
        >
          {stream && (
            <VideoContainer id={myId} isMuted={amIMuted} stream={stream}>
              <PeerVideo stream={stream} name={MYSELF} isMe={true} />
            </VideoContainer>
          )}
        </Botqa>

        <div className="flex w-screen px-6 absolute bottom-6 items-center">
          <ControlPanel
            onFullscreen={() => setFullscreen(!fullscreen)}
            isMuted={amIMuted}
            onAudio={handleAudio}
            toggleChat={() => setIsChatOpen(!isChatOpen)}
          />
        </div>

        <div className={`${isChatOpen ? 'basis-2/6' : 'hidden'}`}>
          <Chat title="Meeting Chat" onClose={() => setIsChatOpen(false)} />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default App;
