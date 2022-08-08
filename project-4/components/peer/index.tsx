import { memo } from 'react';
import ActiveSpeakerIcon from '@components/active-speaker';
import { MYSELF } from '@common/constants';

const PeerVideo = ({ stream, name }: { stream: MediaStream; name: string }) => {
  return (
    <>
      <video
        ref={(node) => {
          if (node) node.srcObject = stream;
        }}
        className="rounded-[12px] w-96 aspect-video object-cover -scale-x-100"
        autoPlay
        muted={name === MYSELF}
      />

      <p className="font-medium absolute bottom-3 left-4 text-xs">
        <span className="text-white">{name}</span>
      </p>

      {/* <ActiveSpeakerIcon /> */}
    </>
  );
};

export default memo(PeerVideo);
