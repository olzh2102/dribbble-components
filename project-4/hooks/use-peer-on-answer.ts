import { Dispatch, SetStateAction, useEffect } from 'react';

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
        console.log(`${call.peer} has left qora`);
      });
    });
  }, [peer, stream]);
};

export default usePeerOnAnswer;
