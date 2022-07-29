import { MediaConnection } from 'peerjs';
import { useContext, useEffect } from 'react';
import { KeyValue } from '../app';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

const usePeerOnLeftRoom = (videoRefs: KeyValue<HTMLDivElement>) => {
  const { socket, peers = {} } = useContext(QoraContext);

  useEffect(() => {
    if (!socket) return;

    socket.on('member-left', (friendId: any) => {
      peers[friendId]?.close();
      videoRefs[friendId]?.remove();
    });

    return () => {
      socket.off('member-left');
    };
  }, [Object.keys(peers).length, Object.keys(videoRefs).length]);
};

export default usePeerOnLeftRoom;
