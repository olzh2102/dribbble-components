import { QoraContext } from '@pages/qora/[qoraId]';
import { MutedIcon } from 'assets/icons';
import { useContext } from 'react';
import { ActiveSpeaker, HostControlPanel } from '..';

const VideoContainer = ({
  id,
  isMuted,
  children,
  stream,
  onMutePeer,
  onRemovePeer,
}: SingleVideoProps) => {
  const { myId, isHost } = useContext(QoraContext);

  return (
    <div key={id} className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50">
      {children}

      {isHost && myId !== id && (
        <HostControlPanel
          onMutePeer={() => onMutePeer && onMutePeer(id)}
          onRemovePeer={() => onRemovePeer && onRemovePeer(id)}
          isMuted={isMuted}
        />
      )}

      {isMuted ? (
        <div className="absolute top-3 right-3">
          <MutedIcon />
        </div>
      ) : (
        <ActiveSpeaker stream={stream} />
      )}
    </div>
  );
};

export default VideoContainer;

type SingleVideoProps = {
  id: string;
  isMuted: boolean;
  children: React.ReactNode;
  stream: MediaStream;
  onMutePeer?: (id: string) => void;
  onRemovePeer?: (id: string) => void;
};
