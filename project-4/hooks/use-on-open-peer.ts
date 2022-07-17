import { useUser } from '@auth0/nextjs-auth0';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../pages/qora/[qoraId]';
import useGetRoomId from './use-get-room-id';

const useOnOpenPeer = (peer: any) => {
  const roomId = useGetRoomId();
  const socket = useContext(SocketContext);

  const [me, setMe] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (!peer || !socket || !user) return;

    peer.on('open', () => {
      setMe(peer.id);
      socket.emit('join-room', {
        userId: peer.id,
        roomId,
        username: user.name,
      });

      console.log('Your device ID is: ', peer.id);
    });
  }, [peer, socket, user]);

  return me;
};

export default useOnOpenPeer;
