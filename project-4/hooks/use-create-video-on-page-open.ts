import { Nullable } from 'common/types';
import { useEffect } from 'react';

const useCreateVideoOnPageOpen = ({
  id,
  stream,
  addVideoStream,
}: {
  id: string;
  stream: Nullable<MediaStream>;
  addVideoStream: ({
    id,
    stream,
    isMe,
  }: {
    id: string;
    stream: MediaStream;
    isMe?: boolean;
  }) => void;
}) => {
  useEffect(() => {
    if (!stream) return;

    addVideoStream({ id, stream, isMe: true });
  }, [id, addVideoStream, stream]);
};

export default useCreateVideoOnPageOpen;
