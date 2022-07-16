import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';
import useGetRoomId from './use-get-room-id';
import useSocketContext from './use-socket-context';

const useOnOpenPeer = ({ peer, socket }: any) => {
  const roomId = useGetRoomId();

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

  return { me };
};

export default useOnOpenPeer;
