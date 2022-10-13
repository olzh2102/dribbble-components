import { useState } from 'react';
import { error } from '@common/utils';
import { Nullable } from '@common/types';

const useScreen = (stream: MediaStream) => {
  const [screenTrack, setScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  async function startShare(onended: () => void) {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      const [screenTrack] = screenStream.getTracks();

      setScreenTrack(screenTrack);
      stream.addTrack(screenTrack);

      screenTrack.onended = () => {
        stopShare(screenTrack);
        onended();
      };
    } catch (e) {
      error('Failed to share screen')(e);
    }
  }

  function stopShare(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream.removeTrack(screenTrack);
    setScreenTrack(null);
  }

  return { screenTrack, startShare, stopShare };
};

export default useScreen;
