import { NextPage } from 'next';
import React, { createContext, useContext, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { ChatAltIcon as ChatIcon } from '@heroicons/react/outline';

import { SocketContext } from '@pages/_app';
import VideoRoom from '@app/index';
import Chat from '@components/chat';
import {
  useCreatePeer,
  useCreateVideoStream,
  useGetRoomId,
  useOnOpenPeer,
} from '@hooks/index';

import 'react-toastify/dist/ReactToastify.css';

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

  const [isHeadlessOpen, setIsHeadlessOpen] = useState(false);

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
      <div className="grid h-screen place-items-center place-content-center relative p-6">
        <VideoRoom />

        <Chat
          open={isHeadlessOpen}
          setOpen={setIsHeadlessOpen}
          title="In-call messages"
        />
        <div className="absolute bottom-6 right-6 w-9 h-9">
          <button onClick={() => setIsHeadlessOpen(!isHeadlessOpen)}>
            <ChatIcon className="w-full stroke-white" />
          </button>
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );
};

export default Qora;
export type KeyValue<T> = Record<string, T>;
