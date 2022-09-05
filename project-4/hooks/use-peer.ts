import { useContext, useEffect, useState } from 'react';
import Peer from 'peerjs';
import { useUser } from '@auth0/nextjs-auth0';
import { SocketContext } from '@pages/_app';
import useGetRoomId from './use-get-room-id';
import { Nullable } from '@common/types';

const usePeer = (isMuted: boolean) => {
  const socket = useContext(SocketContext);
  const room = useGetRoomId();
  const { user } = useUser();
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<Nullable<string>>(null);

  useEffect(() => {
    async function createPeer() {
      if (!user) return;

      try {
        const PeerJs = (await import('peerjs')).default;
        const peer = new PeerJs();
        setPeer(peer);

        peer.on('open', (id) => {
          socket.emit('room:join', {
            room,
            user: { id, name: user.name, muted: isMuted },
          });
          setMyId(id);

          console.log('Your device ID is: ', id);
        });

        peer.on('error', (error) => {
          console.log('Peer connection error:', error);
        });
      } catch (error) {
        console.log('Unable to create peer', error);
      }
    }

    createPeer();
  }, [user]);

  return { peer, myId };
};

export default usePeer;
