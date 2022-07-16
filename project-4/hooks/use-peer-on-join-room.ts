import { useUser } from '@auth0/nextjs-auth0';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSocketContext } from './';

const usePeerOnJoinRoom = ({
  stream,
  peer,
  addVideoStream,
  setPeers,
  socket,
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
  socket: any;
}) => {
  // const { socket } = useSocketContext();
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
          addVideoStream({ id: userId, name: username, stream: friendStream });
        });

        call.on('close', () => {
          console.log(`${userId} has left the room`);
        });

        setPeers((prevState) => ({ ...prevState, [userId]: call }));
      }
    );
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
