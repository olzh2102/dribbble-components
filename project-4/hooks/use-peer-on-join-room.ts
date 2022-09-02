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
    if (!socket || !stream || !peer || !setPeers) return;

    socket.on(
      'user:joined',
      (user: { id: string; name: string; muted: boolean }) => {
        const call = peer.call(user.id, stream, {
          metadata: {
            username: myself?.name,
            isMuted,
          },
        });
        console.log('call friend with name:', user.name);
        console.log('call friend with id:', user.id);

        call.on('stream', (friendStream: any) => {
          console.log('friend stream');
          user.id &&
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
      }
    );

    return () => {
      socket.off('user:joined');
    };
  }, [socket, stream, peer, isMuted]);
};

export default usePeerOnJoinRoom;
