import { memo } from 'react';
import { Nullable } from '@common/types';

const SharedScreen = ({
  sharedScreenTrack,
}: {
  sharedScreenTrack: Nullable<MediaStreamTrack>;
}) => {
  if (!sharedScreenTrack) return null;

  return (
    <video
      className="rounded-[12px] h-[calc(100vh-5rem)] object-contain"
      ref={(node) => {
        if (node) node.srcObject = new MediaStream([sharedScreenTrack]);
      }}
      autoPlay
      muted
    />
  );
};

export default memo(SharedScreen);
