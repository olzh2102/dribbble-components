import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { QoraContext } from '@pages/qora/[qoraId]';

const useScreenShare = () => {
  const {
    socket,
    peer,
    user,
    isHost,
    stream,
    sharedScreenTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);

  const [isMyScreenSharing, setIsMyScreenSharing] = useState(false);

  useEffect(() => {
    socket.on('user:shared-screen', (username: any) => {
      peer.disconnect();
      peer.reconnect();
      toast(`${username} is sharing his screen`);
    });

    socket.on('user:stopped-screen-share', () => {
      setSharedScreenTrack(null);
    });

    socket.on('host:removed-user-shared-screen', () => {
      const sharedScreenTrack = stream?.getVideoTracks()[1];
      if (sharedScreenTrack) stopScreenShare(sharedScreenTrack);
    });

    return () => {
      socket.off('user:shared-screen');
      socket.off('user:stopped-screen-share');
      socket.off('host:removed-user-shared-screen');
    };
  }, [peer]);

  function stopScreenShare(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream?.removeTrack(screenTrack);
    setSharedScreenTrack(null);
    setIsMyScreenSharing(false);
    socket.emit('user:stop-screen-share');
  }

  async function handleScreenShare() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const screenTrack = screenStream.getTracks()[0];
    stream?.addTrack(screenTrack);
    setSharedScreenTrack(screenTrack);
    setIsMyScreenSharing(true);

    socket.emit('user:share-screen', { username: user?.name });

    screenTrack.onended = () => stopScreenShare(screenTrack);
  }

  function toggleScreenShare() {
    if (isHost && !isMyScreenSharing && sharedScreenTrack) {
      socket.emit('host:remove-user-shared-screen');
      return;
    }
    if (!sharedScreenTrack) handleScreenShare();
    else stopScreenShare(sharedScreenTrack);
  }

  return {
    isMyScreenSharing,
    toggleScreenShare,
  };
};

export default useScreenShare;
