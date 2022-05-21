import { useEffect, useState } from 'react';

const useCreatePeer = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'rejected'>('idle');
  const [peer, setPeer] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const PeerJs = (await import('peerjs')).default;
        const p = new PeerJs();
        setPeer(p);
        setStatus('success');
      } catch (e) {
        setStatus('rejected');
      }
    })();
  }, []);

  return {
    peer,
    isIdle: status === 'idle',
    isSuccess: status === 'success',
    isError: status === 'rejected',
  };
};

export default useCreatePeer;
