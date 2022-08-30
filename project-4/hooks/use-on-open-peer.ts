import { useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Peer from 'peerjs';

import { SocketContext } from '@pages/_app';
import { Nullable } from 'common/types';
import useGetRoomId from './use-get-room-id';

const useOnOpenPeer = (peer: Nullable<Peer>, isPeerMuted: boolean) => {
  const { user } = useUser();

  const room = useGetRoomId();
  const socket = useContext(SocketContext);

  const [me, setMe] = useState('');

  useEffect(() => {
    if (!peer || !socket || !user) return;

    peer.on('open', (id) => {
      setMe(id);

      socket.emit('room:join', {
        room,
        user: { id, name: user.name, muted: isPeerMuted },
      });

      console.log('Your device ID is: ', id);
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });
  }, [peer, socket, user]);

  return me;
};

export default useOnOpenPeer;
