import { useEffect } from 'react';
import { useSocketContext, useAddVideoStream } from './';

const usePeerOnJoinRoom = ({
  stream,
  peer,
  videoBoxContainer,
  setFriend,
  setPeers,
}: any) => {
  const { socket } = useSocketContext();
  const addVideoStream = useAddVideoStream(videoBoxContainer);

  useEffect(() => {
    if (!socket || !stream || !peer) return;

    socket.on('member-joined', (friendId: any) => {
      const call = peer.call(friendId, stream);
      setFriend(friendId);
      console.log('call friend with id:', friendId);

      const video = document.createElement('video');
      call.on('stream', (friendStream: MediaStream) => {
        console.log('friend stream');
        addVideoStream(video, friendStream);
      });

      call.on('close', () => {
        video.remove();
      });

      setPeers((prevState: any) => ({ ...prevState, [friendId]: call }));
    });
  }, [socket, stream, peer]);
};

export default usePeerOnJoinRoom;
