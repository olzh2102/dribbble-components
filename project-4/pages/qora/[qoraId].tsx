import { NextPage, GetServerSidePropsContext, PreviewData } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { FAILURE_MSG, LOADER_STREAM_MSG } from '@common/constants';
import { LoaderError } from '@common/components';
import { useMediaStream } from '@hooks/index';

import { Lobby } from '@components/index';
import Room from '@app/index';

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

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<any, PreviewData>
) =>
  await withPageAuthRequired({
    returnTo: '/qora/' + ctx.query.qoraId,
  })(ctx);
