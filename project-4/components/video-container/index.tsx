import { useContext } from 'react';
import { QoraContext } from '@pages/qora/[qoraId]';
import { MutedIcon } from 'assets/icons';
import { ActiveSpeaker, HostControlPanel, VideoPlug } from '..';
import { useUser } from '@auth0/nextjs-auth0';

const VideoContainer = ({
  id,
  stream,
  muted,
  visible,
  avatar,
  onHostMute,
  onHostRemove,
  children,
}: any) => {
  const { me, isHost } = useContext(QoraContext);

  return (
    <div
      key={id}
      className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
    >
      {visible ? children : <VideoPlug userPicture={avatar} />}
      {muted ? <MutedPlug /> : <ActiveSpeaker stream={stream} />}

      {isHost && me !== id && (
        <HostControlPanel
          onMutePeer={() => onHostMute && onHostMute(id)}
          onRemovePeer={() => onHostRemove && onHostRemove(id)}
          isMuted={muted}
        />
      )}
    </div>
  );
};

export default VideoContainer;

const MutedPlug = () => {
  return (
    <div className="absolute top-3 right-3">
      <MutedIcon />
    </div>
  );
};