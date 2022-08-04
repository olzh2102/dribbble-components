import { memo } from 'react';

const Video = ({ stream, muted }: { stream: MediaStream; muted: boolean }) => {
  return (
    <video
      ref={(node) => {
        if (node) node.srcObject = stream;
      }}
      className="rounded-[12px] w-96 aspect-video object-cover -scale-x-100"
      autoPlay
      muted={muted}
    />
  );
};

export default memo(Video);
