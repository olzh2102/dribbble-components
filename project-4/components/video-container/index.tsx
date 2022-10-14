import { useContext } from 'react';
import { QoraContext } from '@pages/qora/[qoraId]';
import { MediaSetup } from '@common/types';
import { MutedIcon } from 'assets/icons';
import { ActiveSpeaker, HostControlPanel, VideoPlug } from '..';
import { UsersConnectionContext } from 'contexts/users-connection';
import { UsersStateContext } from 'contexts/users-settings';

const VideoContainer = ({
  id,
  mediaSetup,
  children,
  stream,
  userPicture,
  onMutePeer,
  onRemovePeer,
}: SingleVideoProps) => {
  // * ola way
  // const { myId, isHost } = useContext(QoraContext);

  // * new way
  const { myId } = useContext(UsersConnectionContext);
  const { isHost } = useContext(UsersStateContext);

  return (
    <div
      key={id}
      className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
    >
      {mediaSetup.isHidden && <VideoPlug userPicture={userPicture} />}
      <div className={`${mediaSetup.isHidden ? 'hidden' : ''}`}>{children}</div>

      {mediaSetup.isMuted ? (
        <div className="absolute top-3 right-3">
          <MutedIcon />
        </div>
      ) : null // <ActiveSpeaker stream={stream} />
      }

      {/* old way */}
      {/* {isHost && myId !== id && ( */}
      {isHost && myId !== id && (
        <HostControlPanel
          onMutePeer={() => onMutePeer && onMutePeer(id)}
          onRemovePeer={() => onRemovePeer && onRemovePeer(id)}
          isMuted={mediaSetup.isMuted}
        />
      )}
    </div>
  );
};

export default VideoContainer;

type SingleVideoProps = {
  id: string;
  mediaSetup: MediaSetup;
  children: React.ReactNode;
  stream: MediaStream;
  userPicture: string;
  onMutePeer?: (id: string) => void;
  onRemovePeer?: (id: string) => void;
};
