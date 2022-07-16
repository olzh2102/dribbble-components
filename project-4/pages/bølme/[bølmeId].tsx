import { NextPage } from 'next';
import { useCreatePeer, useOnOpenPeer, usePeerOnJoinRoom } from '../../hooks';

const Bølme: NextPage = () => {
  return (
    <>
      <Host />
      <Peers />
    </>
  );
};

export default Bølme;

const useHost = () => {};

const Host = () => {
  const { peer } = useCreatePeer();
  // useOnOpenPeer({ peer, isHost: true });

  usePeerOnJoinRoom;

  return null;
};

const Peers = () => {
  const { peer } = useCreatePeer();
  useOnOpenPeer({ peer });

  return null;
};

const MyVideo = () => {};
