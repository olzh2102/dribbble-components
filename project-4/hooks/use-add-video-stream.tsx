import { Dispatch, SetStateAction, useCallback } from 'react';
import { PeerVideo } from '../components';

const useAddVideoStream = ({
  setVideoRefs,
  setVideos,
  onHangUp,
  onToggleAudio,
}: {
  setVideoRefs: Dispatch<SetStateAction<Record<string, HTMLDivElement>>>;
  setVideos: Dispatch<SetStateAction<Record<string, JSX.Element>>>;
  onHangUp: (id: string) => void;
  onToggleAudio: (id: string) => void;
}) => {
  const addVideoStream = useCallback(
    ({
      id,
      name,
      stream,
      isMe,
    }: {
      id: string;
      name?: string;
      stream: MediaStream;
      isMe?: boolean;
    }) => {
      if (!id) return;

      setVideos((prev) => ({
        ...prev,
        [id]: (
          <div
            key={id}
            ref={(node) => {
              if (node) setVideoRefs((prev) => ({ ...prev, [id]: node }));
            }}
            style={{ position: 'relative' }}
            className="drop-shadow-2xl shadow-indigo-500/50 relative"
          >
            <PeerVideo
              isMe={isMe}
              stream={stream}
              name={name}
              onHangUp={() => onHangUp(id)}
              onToggleAudio={() => onToggleAudio(id)}
            />
          </div>
        ),
      }));
    },
    []
  );

  return addVideoStream;
};

export default useAddVideoStream;
