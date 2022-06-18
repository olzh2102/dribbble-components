import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSocketContext } from './';

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
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket || !stream || !peer) return;

    socket.on(
      'member-joined',
      ({ userId, username }: { userId: string; username: string }) => {
        const call = peer.call(userId, stream, { metadata: { username } });
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
