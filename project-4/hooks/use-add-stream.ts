import { RefObject, useCallback } from 'react';

const useAddVideoStream = (videoBox: RefObject<HTMLElement>) => {
  const addVideoStream = useCallback(
    (video: HTMLVideoElement, stream: MediaStream) => {
      if (!videoBox.current) return;

      video.className = 'rounded-3xl max-w-md max-h-80 mr-4';
      video.muted = false;
      video.playsInline = true;
      video.autoplay = true;

      video.srcObject = stream;

      videoBox.current.append(video);
    },
    [videoBox.current]
  );

  return addVideoStream;
};

export default useAddVideoStream;
