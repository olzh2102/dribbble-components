import { useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Peer from 'peerjs';

import { SocketContext } from '@pages/_app';
import { error } from '@common/utils';
import { Nullable, PeerId } from '@common/types';

import useGetRoomId from './use-get-room-id';

/**
 * Sets up a peer
 *
 * 1. creates a peer
 * 2. announces everyone in the room he/she joined
 */
const usePeer = (isMuted: boolean) => {
  const socket = useContext(SocketContext);
  

  const room = useGetRoomId();
  const { user } = useUser();

  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [me, setMe] = useState<PeerId>('');

  useEffect(() => {
    (async function () {
      if (!user) return;

      try {
        const Peer = (await import('peerjs')).default;
        const peer = new Peer();
        setPeer(peer);

        peer.on('open', (id) => {
          setMe(id);
          socket.emit('room:join', getInUser(id, user.name, isMuted, room));
          console.log('your device id: ', id);
        });

        peer.on('error', error('Failed to setup peer connection'));
      } catch (e) {
        error('Unable to create peer')(e);
      }
    })();
  }, [user]);

  return { peer, myId: me };
};

export default usePeer;

// **************************************
function getInUser(
  id: string,
  name: string | null | undefined,
  muted: boolean,
  room: string
): {
  room: string;
  user: { id: string; name: string | null | undefined; muted: boolean };
} {
  return { room, user: { id, name, muted } };
}
