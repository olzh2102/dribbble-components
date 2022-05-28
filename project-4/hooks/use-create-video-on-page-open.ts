import { useEffect } from 'react';
import { useAddVideoStream } from './';

const useCreateVideoOnPageOpen = ({ stream, videoBoxContainer }: any) => {
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!stream) return;

    const video = document.createElement('video');
    addVideoStream(video, stream);
  }, [addVideoStream]);
};

export default useCreateVideoOnPageOpen;
