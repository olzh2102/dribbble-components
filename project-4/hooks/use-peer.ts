import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Peer from 'peerjs';

import { SocketContext } from '@pages/_app';
import { error } from '@common/utils';
import { MediaSetup, Nullable, PeerId, RoomId } from '@common/types';
import { FAILURE_MSG } from '@common/constants';

/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */
const usePeer = ({ muted, visible }: any) => {
  const socket = useContext(SocketContext);
  const room = useRouter().query.qoraId as RoomId;
  const { name, picture: avatar } = useUser().user!;

  const [status, setStatus] = useState('loading');
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [me, setMe] = useState<PeerId>('');

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import('peerjs')).default();
        setPeer(peer);
        setStatus('success');

        peer.on('open', (id) => {
          console.log('your device id: ', id);

          const user = { id, name, avatar, muted, visible };

          setMe(id);
          socket.emit('room:join', { room, user });
        });

        peer.on('error', error(FAILURE_MSG));
      } catch (e) {
        error(FAILURE_MSG)(e);
      }
    })();
  }, []);

  return {
    peer,
    me,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
  };
};

export default usePeer;
