import { useEffect, useState } from 'react';

const useCreatePeer = () => {
  const [peer, setPeer] = useState<any>();

  useEffect(() => {
    (async () => {
      const PeerJs = (await import('peerjs')).default;
      const p = new PeerJs();
      setPeer(p);
    })();
  }, []);

  return peer;
};

export default useCreatePeer;
