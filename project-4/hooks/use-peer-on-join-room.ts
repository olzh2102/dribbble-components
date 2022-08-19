import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { KeyValue, QoraContext } from '@pages/qora/[qoraId]';

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
  const { socket, peer, setPeers, user, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!socket || !stream || !peer || !setPeers) return;

    socket.on('member-joined', ({ userId, username, isPeerMuted }: any) => {
      const call = peer.call(userId, stream, {
        metadata: {
          username: user?.name,
          isMuted,
        },
      });
      console.log('call friend with name:', username);
      console.log('call friend with id:', userId);

      call.on('stream', async (friendStream: any) => {
        console.log('friend stream');
        console.log('FRIEND STREAM TRACKS', friendStream.getTracks());
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

      setPeers((prevState: any) => ({ ...prevState, [userId]: call }));
      setIsMuted((prev) => ({ ...prev, [userId]: isPeerMuted }));
    });

    return () => {
      socket.off('member-joined');
    };
  }, [socket, stream, peer, isMuted]);
};

export default usePeerOnJoinRoom;
