import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSocketContext } from '../../hooks';

const Room: NextPage = () => {
  const [peer, setPeer] = useState<any>();
  useEffect(() => {
    (async () => {
      const PeerJs = (await import('peerjs')).default;
      const p = new PeerJs();
      setPeer(p);
    })();
  }, []);

  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const { socket } = useSocketContext({ roomId });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!peer || !socket) return;

    peer.on('open', (userId: any) => {
      socket.emit('join-room', { roomId, userId });
      console.log('peers established and joined the room');

      socket.on('user-connected', (userId) => {
        console.log('USER ID CONNECTED: ', userId);
      });
    });
  }, [socket, peer]);

  useEffect(() => {
    if (!peer || !socket) return;

    socket.on('user-connected', (userId) => {
      console.log('USER ID CONNECTED: ', userId);
    });
  });

  return <h2>{message}</h2>;
};

export default Room;
