import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { QoraContext } from '@pages/qora/[qoraId]';
import Peer from 'peerjs';

const usePeerOnJoinRoom = (
  addVideoStream: ({
    id,
    name,
    stream,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) => void
) => {
  const { socket, peer, setPeers, user, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!socket || !stream || !peer || !setPeers) return;

    socket.on('member-joined', ({ userId, username }: any) => {
      const call = (peer as Peer).call(userId, stream, {
        metadata: { username: user?.name },
      });
      console.log('call friend with name:', username);
      console.log('call friend with id:', userId);

      call.on('stream', (friendStream: any) => {
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

      setPeers((prevState: any) => ({ ...prevState, [userId]: call }));

      const dataChannel = call.peerConnection.createDataChannel('baigus');
      console.log('CHANNEL', dataChannel);

      dataChannel.onerror = (error) => {
        console.log('Data Channel Error:', error);
      };

      dataChannel.onmessage = (event) => {
        console.log('Got Data Channel Message:', event.data);
      };

      dataChannel.onopen = () => {
        dataChannel.send('Hello World!');
      };

      dataChannel.onclose = () => {
        console.log('The Data Channel is Closed');
      };
      // dataChannel.addEventListener('open', (event) => {
      //   console.log('CHANNEL OPEN EVENT', event);
      // });

      // dataChannel.send('YOYOYOYOY');
    });

    return () => {
      socket.off('member-joined');
    };
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
