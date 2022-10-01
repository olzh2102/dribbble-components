import { NextPage } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Room from '@app/index';
import { Lobby } from '@components/index';
import { useStream } from '@hooks/index';
import { append } from '@common/utils';
import { MediaSetup } from '@common/types';
import LoaderError from '@common/components/loader-error';
import { FAILURE_MSG, LOADER_STREAM_MSG } from '@common/constants';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);

  const [initMediaSetup, setInitMediaSetup] = useState<MediaSetup>({
    isMuted: false,
    isHidden: false,
  });
  const { stream, isLoading } = useStream({ video: true, audio: true });

  if (isLoading) return <LoaderError msg={LOADER_STREAM_MSG} />;
  if (!stream) return <LoaderError msg={FAILURE_MSG} />;
  
  return isLobby ? (
    <Lobby
      stream={stream}
      initMediaSetup={initMediaSetup}
      redirectToRoom={() => setIsLobby(false)}
      setup={(key: keyof MediaSetup) =>
        setInitMediaSetup(append({ [key]: !initMediaSetup[key] }))
      }
    />
  ) : (
    <Room stream={stream} initMediaSetup={initMediaSetup} />
  );
};

export default Qora;

export const getServerSideProps = withPageAuthRequired();
