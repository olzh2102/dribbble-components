import { useContext, useEffect } from 'react';
import { KeyValue } from '../app';
import { SocketContext } from '../pages/qora/[qoraId]';

const usePeerOnLeftRoom = ({
  peers,
  videoRefs,
}: {
  peers: Record<string, any>;
  videoRefs: KeyValue<HTMLDivElement>;
}) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    socket.on('member-left', (friendId: string) => {
      peers[friendId]?.close();
      videoRefs[friendId]?.remove();
    });

    return () => {
      socket.off('member-left');
    };
  }, [Object.keys(peers).length, Object.keys(videoRefs).length]);
};

export default usePeerOnLeftRoom;
