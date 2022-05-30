import { useEffect } from 'react';
import { useAddVideoStream } from './';

const useCreateVideoOnPageOpen = ({
  stream,
  videoBoxContainer,
}: {
  stream: MediaStream | null;
  videoBoxContainer: React.RefObject<HTMLDivElement>;
}) => {
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!stream) return;

    const video = document.createElement('video');
    addVideoStream(video, stream);
  }, [addVideoStream]);
};

export default useCreateVideoOnPageOpen;
