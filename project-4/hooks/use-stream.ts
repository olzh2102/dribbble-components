import { useEffect, useState } from 'react';
import { error } from '@common/utils';
import { Nullable } from '@common/types';

const useStream = (constraints = { audio: false, video: false }) => {
  const [stream, setStream] = useState<Nullable<MediaStream>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function createStream() {
      try {
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
