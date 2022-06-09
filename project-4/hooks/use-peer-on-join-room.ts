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
  addVideoStream: (id: string, stream: MediaStream) => void;
  setPeers: Dispatch<SetStateAction<Record<string, any>>>;
}) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket || !stream || !peer) return;

    socket.on('member-joined', (friendId: string) => {
      const call = peer.call(friendId, stream, {
        metadata: { msg: 'CALL FROM HOST' },
      });
      console.log('call friend with id:', friendId);

      // const conn = peer.connect(friendId);

      // conn.on('open', () => {
      //   conn.send('Hello! from join');
      // });

      call.on('stream', (friendStream: MediaStream, message: any) => {
        console.log('friend stream');
        console.log('RECEIVED:', friendStream);
        addVideoStream(friendId, friendStream);
      });

      call.on('close', () => {
        console.log(`${friendId} has left the room`);
      });

      setPeers((prevState) => ({ ...prevState, [friendId]: call }));
    });
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
