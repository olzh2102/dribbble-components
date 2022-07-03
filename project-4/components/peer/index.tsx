import ActiveSpeakerIcon from '../active-speaker';
import ControlPanel from '../control-panel';

const PeerVideo = ({ isMe, isHost, stream, name }: any) => {
  return (
    <>
      <video
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
      {/* {isHost && (
        <>
          <ControlPanel
            onAudio={() => toggle('audio', peerId)}
            onHangUp={() => {
              socket?.emit('remove-peer', peerId);
              peers[peerId]?.close();
              videoRefs[peerId]?.remove();
            }}
            constraints={DEFAULT_CONSTRAINTS}
          />
          <div>I am THE host</div>
        </>
      )} */}
    </>
  );
};

export default PeerVideo;
