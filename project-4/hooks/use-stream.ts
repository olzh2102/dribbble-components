import { useEffect, useState } from 'react';
import { error } from '@common/utils';

const useStream = (constraints = { audio: false, video: false }) => {
  const [stream, setStream] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function createStream() {
      try {
        setStream(new MediaStream())
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setStream(stream)
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false)
        error('Access denied for audio and video stream')(e) 
      }
    })();
  }, []);

  return {stream, isLoading};
};

export default useStream;
