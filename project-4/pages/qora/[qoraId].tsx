import { NextPage } from 'next';
import { createContext, useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { ChatAltIcon as ChatIcon } from '@heroicons/react/outline';

import VideoRoom from '@app/index';
import Chat from '@components/chat';
import {
  useCreatePeer,
  useCreateVideoStream,
  useGetRoomId,
  useOnOpenPeer,
} from '@hooks/index';

import 'react-toastify/dist/ReactToastify.css';
import { SocketContext } from '@pages/_app';

export const QoraContext = createContext<any>({});

const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};

const Qora: NextPage = () => {
  const socket = useContext(SocketContext);
  const roomId = useGetRoomId();
  const peer = useCreatePeer();
  const user = useUser();
  const stream = useCreateVideoStream({ video: true, audio: true });
  const me = useOnOpenPeer(peer);

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

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

  async function postNewMessage(user: string, text: string) {
    const data = {
      user,
      text,
    };

    socket.emit('chat:post', data);
  }

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
      }}
    >
      <div className="flex h-screen place-items-center place-content-center relative p-6">
        <div className={`${isChatOpen ? 'basis-4/6' : 'basis-6/6'}`}>
          <VideoRoom />
        </div>

        <button
          className="absolute right-6 bottom-6"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          show chat
        </button>

        <div className={`${isChatOpen ? 'basis-2/6' : 'hidden'}`}>
          <Chat setOpen={setIsChatOpen} title="Item Details">
            chat will be here
          </Chat>
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default Qora;
export type KeyValue<T> = Record<string, T>;
