import { memo } from 'react';
import ActiveSpeakerIcon from '@components/active-speaker';

const PeerVideo = ({
  stream,
  name,
  isMe,
}: {
  stream: MediaStream;
  name: string;
  isMe?: boolean;
}) => {
  return (
    <>
      <video
        ref={(node) => {
          if (node) node.srcObject = stream;
        }}
        className="rounded-[12px] w-96 aspect-video object-cover -scale-x-100"
        autoPlay
        muted={isMe}
      />

      <p className="font-medium absolute bottom-3 left-4 text-xs">
        <span className="text-white">{name}</span>
      </p>

      {/* <ActiveSpeakerIcon stream={stream} /> */}
    </>
  );
};

export default memo(PeerVideo);
