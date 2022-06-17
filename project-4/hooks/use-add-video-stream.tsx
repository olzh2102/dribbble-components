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
      stream,
      muted,
    }: {
      id: string;
      stream: MediaStream;
      muted?: boolean;
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
          >
            <video
              ref={(node) => {
                if (node) {
                  node.srcObject = stream;
                }
              }}
              className="rounded-3xl w-80 h-72 object-cover"
              autoPlay
              muted={muted}
            />
            <p className="font-medium">
              <span className="text-blue-600">{id}</span>
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
