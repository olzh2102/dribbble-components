import { NextPage } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// import Room from '@app/index';
import Room from '../../app/app';
import { Lobby } from '@components/index';
import { useStream } from '@hooks/index';
import { append } from '@common/utils';
import { MediaSetup } from '@common/types';
import LoaderError from '@common/components/loader-error';
import { FAILURE_MSG, LOADER_STREAM_MSG } from '@common/constants';
import useMediaStream from '@hooks/use-media-stream';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return <LoaderError msg={LOADER_STREAM_MSG} />;
  if (!stream) return <LoaderError msg={FAILURE_MSG} />;

  if (isLobby)
    return <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />;

  return <Room stream={stream} />;
};

export default Qora;

export const getServerSideProps = withPageAuthRequired();
