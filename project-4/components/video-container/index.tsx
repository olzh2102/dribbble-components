import { useContext } from 'react';
import { QoraContext } from '@pages/qora/[qoraId]';
import { InitSetup } from '@common/types';
import { MutedIcon } from 'assets/icons';
import { ActiveSpeaker, HostControlPanel, VideoPlug } from '..';

const VideoContainer = ({
  id,
  initSetup,
  children,
  stream,
  onMutePeer,
  onRemovePeer,
}: SingleVideoProps) => {
  const { myId, isHost, user } = useContext(QoraContext);

  return (
    <div
      key={id}
      className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
    >
      {initSetup.isHidden ? <VideoPlug user={user} /> : children}

      {initSetup.isMuted ? (
        <div className="absolute top-3 right-3">
          <MutedIcon />
        </div>
      ) : (
        <ActiveSpeaker stream={stream} />
      )}

      {isHost && myId !== id && (
        <HostControlPanel
          onMutePeer={() => onMutePeer && onMutePeer(id)}
          onRemovePeer={() => onRemovePeer && onRemovePeer(id)}
          isMuted={initSetup.isMuted}
        />
      )}
    </div>
  );
};

export default VideoContainer;

type SingleVideoProps = {
  id: string;
  initSetup: InitSetup;
  children: React.ReactNode;
  stream: MediaStream;
  onMutePeer?: (id: string) => void;
  onRemovePeer?: (id: string) => void;
};
