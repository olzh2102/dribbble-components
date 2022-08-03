import { QoraContext } from '@pages/qora/[qoraId]';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

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

    peer.on('call', (call: any) => {
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
    });

    return () => {
      peer.off('call');
    };
  }, [peer, stream]);
};

export default usePeerOnAnswer;
