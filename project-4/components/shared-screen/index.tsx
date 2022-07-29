import React from 'react';

const SharedScreen = ({
  sharedScreenTrack,
}: {
  sharedScreenTrack: MediaStreamTrack | null;
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

export default React.memo(SharedScreen);
