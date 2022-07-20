import { useUser } from '@auth0/nextjs-auth0';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { SocketContext } from '../pages/qora/[qoraId]';

const usePeerOnJoinRoom = ({
  stream,
  peer,
  addVideoStream,
  setPeers,
}: {
  peer: any;
  stream: MediaStream | null;
  addVideoStream: ({
    id,
    name,
    stream,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) => void;
  setPeers: Dispatch<SetStateAction<Record<string, any>>>;
}) => {
  const socket = useContext(SocketContext);
  const { user } = useUser();

  useEffect(() => {
    if (!socket || !stream || !peer) return;

    socket.on(
      'member-joined',
      ({ userId, username }: { userId: string; username: string }) => {
        const call = peer.call(userId, stream, {
          metadata: { username: user?.name },
        });
        console.log('call friend with name:', username);
        console.log('call friend with id:', userId);

        call.on('stream', (friendStream: MediaStream) => {
          console.log('friend stream');
          userId &&
            addVideoStream({
              id: userId,
              name: username,
              stream: friendStream,
            });
        });

        call.on('close', () => {
          toast(`${username} has left the room`);
        });

        setPeers((prevState) => ({ ...prevState, [userId]: call }));
      }
    );

    return () => {
      socket.off('member-joined');
    };
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
