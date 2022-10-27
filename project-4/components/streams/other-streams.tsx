import { useContext } from 'react';

import { UsersStateContext } from 'contexts/users-settings';

import VideoContainer from '@components/video-container';
import { UsersConnectionContext } from 'contexts/users-connection';
import { UsersUpdaterContext } from 'contexts/users-settings';

export default function OtherStreams() {
  const { streams, isMuted, isHidden, avatars } = useContext(UsersStateContext);
  const { muteUser } = useContext(UsersUpdaterContext);
  const { leaveRoom } = useContext(UsersConnectionContext);

  return (
    <>
      {Object.entries(streams).map(([id, element]: any) => (
        <VideoContainer
          key={id}
          id={id}
          muted={isMuted[id]}
          visible={!isHidden[id]}
          userPicture={avatars[id]}
          stream={element.props.stream}
          onMutePeer={muteUser}
          onRemovePeer={leaveRoom}
        >
          {element}
        </VideoContainer>
      ))}
    </>
  );
}
