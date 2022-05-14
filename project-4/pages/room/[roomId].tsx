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

  console.log('PEER: ', peer);
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };

  const { socket } = useSocketContext({ roomId });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message) => {
      setMessage(message.msg);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    if (!peer || !socket) return;

    peer.on('open', (peerId: any) => {
      socket.emit('join-room', { roomId, peerId });
    });
  });

  return <h2>{message}</h2>;
};

export default Room;
