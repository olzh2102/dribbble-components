import React from 'react';

const SharedScreen = ({
  sharedScreenTrack,
}: {
  sharedScreenTrack: MediaStreamTrack | null;
}) => {
  return sharedScreenTrack ? (
    <div className="basis-5/6 flex justify-center">
      <video
        className="rounded-[12px] h-[calc(100vh-5rem)] object-contain"
        ref={(node) => {
          if (node) node.srcObject = new MediaStream([sharedScreenTrack]);
        }}
        autoPlay
        muted
      />
    </div>
  ) : null;
};

export default React.memo(SharedScreen);
