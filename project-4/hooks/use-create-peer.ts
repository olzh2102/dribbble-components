import Peer from 'peerjs';
import { useEffect, useState } from 'react';
import { Nullable } from 'common/types';

const useCreatePeer = () => {
  const [peer, setPeer] = useState<Nullable<Peer>>(null);

  useEffect(() => {
    (async () => {
      try {
        const PeerJs = (await import('peerjs')).default;
        const p = new PeerJs();
        setPeer(p);
      } catch (e) {}
    })();
  }, []);

  return peer;
};

export default useCreatePeer;
