import Peer, { MediaConnection } from 'peerjs';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { KeyValue } from '../app';

const usePeerOnAnswer = ({
  peer,
  stream,
  addVideoStream,
  setPeers,
}: {
  peer: Peer | null;
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
  setPeers: Dispatch<SetStateAction<KeyValue<MediaConnection>>>;
}) => {
  useEffect(() => {
    if (!peer || !stream) return;

    peer.on('call', (call) => {
      setPeers((prev) => ({ ...prev, [call.peer]: call }));

      call.answer(stream);

      call.on('stream', (hostStream) => {
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
