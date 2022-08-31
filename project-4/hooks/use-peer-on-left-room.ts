import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { QoraContext } from '@pages/qora/[qoraId]';
import { KeyValue } from '@common/types';

const usePeerOnLeftRoom = (videoRefs: KeyValue<HTMLDivElement>) => {
  const router = useRouter();
  const { me, socket, peers } = useContext(QoraContext);

  useEffect(() => {
    socket.on('user:left', (friendId: string) => {
      peers[friendId]?.close();
      videoRefs[friendId]?.remove();

      if (me === friendId) router.push('/');
    });

    return () => {
      socket.off('user:left');
    };
  }, [peers, videoRefs]);
};

export default usePeerOnLeftRoom;
