import { useEffect } from 'react';
import { useSocketContext } from './';

const usePeerOnLeftRoom = ({ peers }: Record<string, any>) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    socket.on('member-left', (friendId: string) => {
      peers[friendId]?.close();
    });
  }, [Object.keys(peers).length]);
};

export default usePeerOnLeftRoom;
