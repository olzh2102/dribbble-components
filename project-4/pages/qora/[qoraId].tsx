import { NextPage } from 'next';
import { createContext, useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Room from '../../app/room';
import { Lobby } from '@components/index';
import { useMediaStream } from '@hooks/index';
import LoaderError from '@common/components/loader-error';

export const QoraContext = createContext<any>({});

const Qora: NextPage = () => {
  const [isLobby, setIsLobby] = useState(true);
  const { stream, toggle, isLoading, isError, muted, visible } = useMediaStream();

  if (isLoading) return <LoaderError msg="Hold on. Getting your video stream ready... 🚀" />;
  if (!stream || isError)
    return <LoaderError msg="Ooops!!! Couldn't create stream for you. Try again later 🫠" />;

  return isLobby ? (
    <Lobby
      stream={stream}
      muted={muted}
      visible={visible}
      onToggle={(kind: 'audio' | 'video') => toggle(kind)()}
      onRedirectToRoom={() => setIsLobby(false)}
    />
  ) : (
    <Room stream={stream} />
  );
};;

export default Qora;

export const getServerSideProps = withPageAuthRequired();
