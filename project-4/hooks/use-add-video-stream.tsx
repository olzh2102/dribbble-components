import { Dispatch, SetStateAction } from 'react';
import { PeerVideo } from '../components';

const useAddVideoStream = ({
  setVideoRefs,
  setVideos,
}: {
  setVideoRefs: Dispatch<SetStateAction<Record<string, HTMLDivElement>>>;
  setVideos: Dispatch<SetStateAction<Record<string, JSX.Element>>>;
}) => {
  const addVideoStream = ({
    id,
    name = '',
    stream,
    isMe = false,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
    isMe: boolean;
  }) => {
    if (!id) return;
    console.log('add video stream:', id);

    setVideos((prev) => ({
      ...prev,
      [id]: (
        <div
          key={id}
          ref={(node) => {
            if (node) setVideoRefs((prev) => ({ ...prev, [id]: node }));
          }}
          className="drop-shadow-2xl shadow-indigo-500/50"
        >
          <PeerVideo isMe={isMe} stream={stream} name={name} />
        </div>
      ),
    }));
  };

  return addVideoStream;
};

export default useAddVideoStream;
