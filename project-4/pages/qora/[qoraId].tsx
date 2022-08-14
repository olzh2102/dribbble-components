import { NextPage } from 'next';
import { createContext, useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import VideoRoom from '@app/index';
import Chat from '@components/chat';
import {
  useCreatePeer,
  useCreateVideoStream,
  useGetRoomId,
  useOnOpenPeer,
} from '@hooks/index';
import { InitialStreamSettingsContext, SocketContext } from '@pages/_app';
import { Nullable } from '@common/types';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export const QoraContext = createContext<any>({});

const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};

const INITIAL = {
  isMuted: true,
  video: true,
};

const Qora: NextPage = () => {
  const { isMuted, isVisible } = useContext<any>(InitialStreamSettingsContext);
  const socket = useContext(SocketContext);
  const roomId = useGetRoomId();
  const peer = useCreatePeer();
  const user = useUser();
  const stream = useCreateVideoStream({ video: true, audio: true });
  const me = useOnOpenPeer(peer, isMuted);

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  if (stream) stream.getVideoTracks()[0].enabled = isVisible;

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
        me,
        peers,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex h-screen place-items-center place-content-center relative p-6">
        <VideoRoom
          initial={{
            isMuted,
            video: isVisible,
          }}
          toggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        <div className={`${isChatOpen ? 'basis-2/6' : 'hidden'}`}>
          <Chat setOpen={setIsChatOpen} title="Item Details" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default Qora;
export type KeyValue<T> = Record<string, T>;
