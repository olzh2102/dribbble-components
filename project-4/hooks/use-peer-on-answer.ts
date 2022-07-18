import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';

const usePeerOnAnswer = ({
  peer,
  stream,
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
  useEffect(() => {
    if (!peer || !stream) return;

    peer.on('call', (call: any) => {
      setPeers((prev: any) => ({ ...prev, [call.peer]: call }));

      call.answer(stream);

      call.on('stream', (hostStream: MediaStream) => {
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
