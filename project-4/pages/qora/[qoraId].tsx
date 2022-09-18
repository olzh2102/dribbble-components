import { NextPage } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Room from '@app/index';
import { Lobby } from '@components/index';
import { useCreateVideoStream } from '@hooks/index';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);

  const [media, setMedia] = useState<any>({ isMuted: false, isVisible: true });
  const stream = useCreateVideoStream({ video: true, audio: true });

  return isLobby ? (
    <Lobby
      stream={stream!}
      media={media}
      redirectToRoom={() => setIsLobby(false)}
      setMedia={(key: string) =>
        setMedia((prev: any) => ({ ...prev, [key]: !media[key] }))
      }
    />
  ) : (
    <Room stream={stream} media={media} />
  );
};

export default Qora;

export const getServerSideProps = withPageAuthRequired();
