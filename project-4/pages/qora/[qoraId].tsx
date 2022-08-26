import { NextPage } from 'next';
import { createContext, useState } from 'react';

import Room from '@app/index';
import { Lobby } from '@components/index';
import { useCreateVideoStream } from '@hooks/index';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);
  const [media, setMedia] = useState({
    isMuted: false,
    isVisible: true,
  });

  const stream = useCreateVideoStream({ video: true, audio: true });

  if (stream) stream.getVideoTracks()[0].enabled = media.isVisible;

  return isLobby ? (
    <Lobby
      stream={stream}
      media={media}
      setIsLobby={() => setIsLobby(!isLobby)}
      setIsMuted={() =>
        setMedia((prev) => ({ ...prev, isMuted: !prev.isMuted }))
      }
      setIsVisible={() =>
        setMedia((prev) => ({ ...prev, isMuted: !prev.isVisible }))
      }
    />
  ) : (
    <Room stream={stream} isMuted={media.isMuted} isVisible={media.isVisible} />
  );
};

export default Qora;
