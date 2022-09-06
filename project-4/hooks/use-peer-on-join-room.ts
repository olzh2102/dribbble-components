import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { QoraContext } from '@pages/qora/[qoraId]';
import { KeyValue } from '@common/types';

const usePeerOnJoinRoom = (
  addVideoStream: ({
    id,
    name,
    stream,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) => void,
  isMuted: boolean,
  setIsMuted: Dispatch<SetStateAction<KeyValue<boolean>>>
) => {
  const {
    socket,
    peer,
    setPeers,
    user: myself,
    stream,
  } = useContext(QoraContext);

  useEffect(() => {
    socket.on('user:joined', (user: UserConfig) => {
      const call = peer.call(user.id, stream, {
        metadata: {
          username: myself?.name,
          isMuted,
        },
      });

      console.table({
        'call-friend': 'call friend',
        'user-id': user.id,
        'user-name': user.name,
      });

      call.on('stream', (friendStream: MediaStream) => {
        addVideoStream({
          id: user.id,
          name: user.name,
          stream: friendStream,
        });
      });

      call.on('close', () => {
        toast(`${user.name} has left the room`);
      });

      setPeers((prevState: any) => ({ ...prevState, [user.id]: call }));
      setIsMuted((prev) => ({ ...prev, [user.id]: user.muted }));
    });

    return () => {
      socket.off('user:joined');
    };
  }, [isMuted]);
};

export default usePeerOnJoinRoom;

type UserConfig = {
  id: string;
  name: string;
  muted: boolean;
};
