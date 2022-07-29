import { useUser } from '@auth0/nextjs-auth0';
import Peer from 'peerjs';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@pages/_app';
import useGetRoomId from './use-get-room-id';

const useOnOpenPeer = (peer: Peer | null) => {
  const roomId = useGetRoomId();
  const socket = useContext(SocketContext);

  const [me, setMe] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (!peer || !socket || !user) return;

    peer.on('open', (id) => {
      setMe(id);
      socket.emit('join-room', {
        userId: id,
        roomId,
        username: user.name,
      });

      console.log('Your device ID is: ', id);
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    return () => {
      peer.off('open');
      peer.off('error');
    };
  }, [peer, socket, user]);

  return me;
};

export default useOnOpenPeer;
