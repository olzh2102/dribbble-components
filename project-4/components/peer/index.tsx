import { useEffect, useState } from 'react';
import { useGetRoomId, useSocketContext } from '../../hooks';
import ActiveSpeakerIcon from '../active-speaker';
import ControlPanel from '../control-panel';

const DEFAULT_CONSTRAINTS = {
  video: true,
  audio: true,
};

const PeerVideo = ({ isMe, stream, name, onHangUp, onToggleAudio }: any) => {
  const [isHover, setIsHover] = useState(false);
  const roomId = useGetRoomId();

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    setIsHost(!!window.localStorage.getItem(roomId));
  }, [roomId]);

  console.log(isHover);

  return (
    <>
      <video
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        ref={(node) => {
          if (node) node.srcObject = stream;
        }}
        className="rounded-[40px] w-96 h-72 object-cover"
        autoPlay
        muted={isMe}
      />
      <p className="font-medium absolute bottom-3 left-4 text-xs">
        <span className="text-white">{isMe ? 'You' : name}</span>
      </p>
      <ActiveSpeakerIcon stream={stream} />
      {/* TODO: re-render of video on hover and mouseleave malfunctioning */}
      {!isMe && isHost && isHover && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <ControlPanel
            onAudio={onToggleAudio}
            onHangUp={onHangUp}
            constraints={DEFAULT_CONSTRAINTS}
          />
        </div>
      )}
    </>
  );
};

export default PeerVideo;
