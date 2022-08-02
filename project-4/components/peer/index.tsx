import { MYSELF } from 'common/constants';
import ActiveSpeakerIcon from '../active-speaker';

const PeerVideo = ({ isMe, stream, name }: any) => {
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
        <span className="text-white">{isMe ? MYSELF : name}</span>
      </p>
      {/* <ActiveSpeakerIcon stream={stream} /> */}
    </>
  );
};

export default PeerVideo;
