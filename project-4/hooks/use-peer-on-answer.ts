import { QoraContext } from '@pages/qora/[qoraId]';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Peer from 'peerjs';

const usePeerOnAnswer = (
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
  const { peer, setPeers, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!peer || !stream || !setPeers) return;

    (peer as Peer).on('call', (call) => {
      setPeers((prev: any) => ({ ...prev, [call.peer]: call }));

      call.answer(stream);

      call.on('stream', (hostStream: any) => {
        console.log('answer call stream');
        call.peer &&
          addVideoStream({
            id: call.peer,
            name: call.metadata.username,
            stream: hostStream,
          });
      });

      call.on('close', () => {
        toast(`${call.metadata.username} has left the room`);
      });

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
    });

    return () => {
      peer.off('call');
    };
  }, [peer, stream]);
};

export default usePeerOnAnswer;
