import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';
import { Transition } from '@headlessui/react';

import { MutedIcon } from '../assets/icons';
import Chat from '../components/chat';
import { toggleAudio } from '../common/utils';
import {
  ControlPanel,
  HostControlPanel,
  PeerVideo,
  SharedScreen,
} from '../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  usePeerOnLeftRoom,
  useGetRoomId,
} from '../hooks';
import { SocketContext } from '../pages/qora/[qoraId]';
import { SpaceContext } from '../pages/space/[spaceId]';

const App = () => {
  const space = useContext(SpaceContext);
  console.log('your space: ', space);
  return null;
};

export default App;

export type KeyValue<T> = Record<string, T>;
