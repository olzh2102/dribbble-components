import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { QoraContext } from '@pages/qora/[qoraId]';
import { KeyValue } from '@common/types';

const usePeerOnAnswer = (
  addVideoStream: ({
    id,
    name,
    stream,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) => void,
  setIsMuted: Dispatch<SetStateAction<KeyValue<boolean>>>
) => {
  const { peer, setPeers, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on('call', (call: any) => {
      setPeers((prev: any) => ({ ...prev, [call.peer]: call }));
      setIsMuted((prev) => ({
        ...prev,
        [call.peer]: call.metadata.isMuted,
      }));

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
  }, [peer, stream]);
};

export default usePeerOnAnswer;
