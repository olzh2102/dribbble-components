import { useEffect, useState } from 'react';

const useCreateVideoStream = (constraints: any) => {
  const [status, setStatus] = useState<'idle' | 'success' | 'rejected'>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function getStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        setStatus('success');
      } catch (error) {
        setStatus('rejected');
        console.log('Access denied for audio and video stream', error);
      }
    }

    getStream();
  }, []);

  return {
    stream,
    isIdle: status === 'idle',
    isSuccess: status === 'success',
    isError: status === 'rejected',
  };
};

export default useCreateVideoStream;
