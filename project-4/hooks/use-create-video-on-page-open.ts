import { useEffect } from 'react';

const useCreateVideoOnPageOpen = ({
  id,
  stream,
  addVideoStream,
}: {
  id: string;
  stream: MediaStream | null;
  addVideoStream: ({
    id,
    stream,
    muted,
  }: {
    id: string;
    stream: MediaStream;
    muted?: boolean;
  }) => void;
}) => {
  useEffect(() => {
    if (!stream) return;

    addVideoStream({ id, stream, muted: true });
  }, [id, addVideoStream, stream]);
};

export default useCreateVideoOnPageOpen;
