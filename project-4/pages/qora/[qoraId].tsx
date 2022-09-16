import { NextPage } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Room from '@app/index';
import { Lobby } from '@components/index';
import { useStream } from '@hooks/index';
import { append } from '@common/utils';
import { InitSetup } from '@common/types';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);

  const [initSetup, setInitSetup] = useState<InitSetup>({
    isMuted: false,
    isHidden: false,
  });
  const { stream, isLoading } = useStream({ video: true, audio: true });

  if (isLoading)
    return (
      <div className="grid place-items-center h-screen text-white">
        Hold on. Getting your video stream ready... 🚀
      </div>
    );

  if (!stream)
    return (
      <div className="grid place-items-center h-screen text-white">
        Ooops!!! Couldn't create stream for you. Try again later 🫠
      </div>
    );

  return isLobby ? (
    <Lobby
      stream={stream}
      initSetup={initSetup}
      redirectToRoom={() => setIsLobby(false)}
      setup={(key: keyof InitSetup) =>
        setInitSetup(append({ [key]: !initSetup[key] }))
      }
    />
  ) : (
    <Room stream={stream} initSetup={initSetup} />
  );
};

export default Qora;

export const getServerSideProps = withPageAuthRequired();
