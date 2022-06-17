import { Dispatch, SetStateAction, useCallback } from 'react';

const useAddVideoStream = ({
  setVideoRefs,
  setVideos,
}: {
  setVideoRefs: Dispatch<SetStateAction<Record<string, HTMLDivElement>>>;
  setVideos: Dispatch<SetStateAction<Record<string, JSX.Element>>>;
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
          >
            <video
              ref={(node) => {
                if (node) {
                  node.srcObject = stream;
                }
              }}
              className="rounded-3xl w-80 h-72 object-cover"
              autoPlay
              muted={isMe}
            />
            <p
              className="font-medium"
              style={{
                position: 'absolute',
                bottom: '13px',
                fontSize: '12px',
                left: '10px',
              }}
            >
              <span className="text-white">{isMe ? 'You' : name}</span>
            </p>
          </div>
        ),
      }));
    },
    []
  );

  return addVideoStream;
};

export default useAddVideoStream;
