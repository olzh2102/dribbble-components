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
    socket.on('screen-shared', (username: any) => {
      peer.disconnect();
      peer.reconnect();
      toast(`${username} is sharing his screen`);
    });

    socket.on('screen-sharing-stopped', () => {
      setSharedScreenTrack(null);
    });

    socket.on('shared-video-removed', () => {
      const sharedScreenTrack = stream?.getVideoTracks()[1];
      if (sharedScreenTrack) stopScreenShare(sharedScreenTrack);
    });

    return () => {
      socket.off('screen-shared');
      socket.off('screen-sharing-stopped');
      socket.off('shared-video-removed');
    };
  }, [peer]);

  function stopScreenShare(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream?.removeTrack(screenTrack);
    setSharedScreenTrack(null);
    setIsMyScreenSharing(false);
    socket.emit('stop-sharing-my-screen');
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

    socket.emit('share-my-screen', { username: user?.name });

    screenTrack.onended = () => stopScreenShare(screenTrack);
  }

  function toggleScreenShare() {
    if (isHost && !isMyScreenSharing && sharedScreenTrack) {
      socket.emit('remove-peer-shared-video');
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
