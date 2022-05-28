import { useEffect } from 'react';
import { useSocketContext, useAddVideoStream } from './';

const usePeerOnJoinRoom = ({
  stream,
  peer,
  videoBoxContainer,
  setFriend,
}: any) => {
  const { socket } = useSocketContext();
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!socket || !stream || !peer) return;

    socket.on('member-joined', (friendId: any) => {
      const call = peer.call(friendId, stream);
      setFriend(friendId);
      console.log('call friend with id:', friendId);

      call.on('stream', (friendStream: MediaStream) => {
        console.log('friend stream');
        const video = document.createElement('video');
        addVideoStream(video, friendStream);
      });
    });
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
