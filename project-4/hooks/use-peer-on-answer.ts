import { useEffect } from 'react';
import { useAddVideoStream } from './';

const usePeerOnAnswer = ({
  peer,
  stream,
  videoBoxContainer,
  setFriend,
  setPeers,
}: any) => {
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on('call', (call: any) => {
      setFriend(call.peer);
      setPeers((prev: any) => ({ ...prev, [call.peer]: call }));
      console.log('answer call from:', call.peer);

      call.answer(stream);

      const video = document.createElement('video');
      call.on('stream', (hostStream: MediaStream) => {
        console.log('answer call stream');
        addVideoStream(video, hostStream);
      });

      call.on('close', () => {
        video.remove();
      });
    });
  }, [peer, stream]);
};

export default usePeerOnAnswer;
