import { useContext } from 'react';

import { UsersStateContext } from 'contexts/users-settings';

import VideoContainer from '@components/video-container';
import { UsersConnectionContext } from 'contexts/users-connection';

export default function OtherStreams() {
  const { streams, isMuted, isHidden, avatars } = useContext(UsersStateContext);
  const { leaveRoom } = useContext(UsersConnectionContext);

  console.log('STREAMS:', streams);

  return (
    <div className="flex gap-4">
      <div className="flex flex-wrap gap-4 justify-around">
        {Object.entries(streams).map(([id, element]: any) => (
          <VideoContainer
            key={id}
            id={id}
            mediaSetup={{ isMuted: isMuted[id], isHidden: isHidden[id] }}
            userPicture={avatars[id]}
            stream={element.props.stream}
            onMutePeer={() => {}}
            onRemovePeer={leaveRoom}
          >
            {element}
          </VideoContainer>
        ))}
      </div>
    </div>
  );
}
