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
  const peer = usePeer(media.isMuted);
  const user = useUser();
  console.log('PEER:', peer);

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (user.isLoading) return <span>Loading...</span>;

  if (typeof window !== 'undefined' && !user.user)
    window.location.href = '/api/auth/login';

  return (
    <QoraContext.Provider
      value={{
        socket,
        roomId,
        peer,
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
        <Botqa media={media} toggleChat={() => setIsChatOpen(!isChatOpen)} />

        <div className={`${isChatOpen ? 'basis-2/6' : 'hidden'}`}>
          <Chat setOpen={setIsChatOpen} title="Item Details" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default App;
