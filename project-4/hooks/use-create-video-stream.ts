import { useEffect, useState } from 'react';

import { error } from '@common/utils';
import { Nullable } from 'common/types';

const useCreateVideoStream = (constraints = { audio: false, video: false }) => {
  const [stream, setStream] = useState<Nullable<MediaStream>>(null);

  useEffect(() => {
    (function createStream() {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(setStream)
        .catch(error('Access denied for audio and video stream'));
    })();
  }, []);

  return stream;
};

export default useCreateVideoStream;
