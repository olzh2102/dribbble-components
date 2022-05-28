import { useEffect } from 'react';
import { useAddVideoStream } from './';

const usePeerOnAnswer = ({
  peer,
  stream,
  videoBoxContainer,
  setFriend,
}: any) => {
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on('call', (call: any) => {
      setFriend(call.peer);
      console.log('answer call from:', call.peer);

      call.answer(stream);

      call.on('stream', (hostStream: MediaStream) => {
        console.log('answer call stream');
        const video = document.createElement('video');
        addVideoStream(video, hostStream);
      });
    });
  }, [peer, stream]);
};

export default usePeerOnAnswer;
