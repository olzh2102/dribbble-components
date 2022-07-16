import { useEffect } from 'react';
import { useSocketContext } from './';

const usePeerOnLeftRoom = ({
  peers,
  videoRefs,
  socket,
}: {
  peers: Record<string, any>;
  videoRefs: Record<string, HTMLDivElement>;
  socket: any;
}) => {
  // const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    socket.on('member-left', (friendId: string) => {
      peers[friendId]?.close();
      videoRefs[friendId]?.remove();
    });
  }, [Object.keys(peers).length, Object.keys(videoRefs).length]);
};

export default usePeerOnLeftRoom;
