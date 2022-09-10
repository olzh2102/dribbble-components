import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { QoraContext } from '@pages/qora/[qoraId]';
import { error } from '@common/utils';

const useScreenShare = () => {
  const {
    socket,
    peer,
    user: { name: username = '' },
    stream,
    sharedScreenTrack: sharedTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);

  const [amISharing, setAmISharing] = useState(false);

  useEffect(() => {
    socket.on('user:shared-screen', resetPeer);
    socket.on('user:stopped-screen-share', () => setSharedScreenTrack(null));
    socket.on('host:removed-user-shared-screen', stopScreenShareByHost);

    return () => {
      socket.off('user:shared-screen');
      socket.off('user:stopped-screen-share');
      socket.off('host:removed-user-shared-screen');
    };
  }, [peer]);

  return {
    isMyScreenSharing: amISharing,
    toggleScreenShare: () => {
      !sharedTrack ? startScreenShare() : stopScreenShare(sharedTrack);
    },
  };

  // ******************************

  function stopScreenShare(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream?.removeTrack(screenTrack);

    setSharedScreenTrack(null);
    setAmISharing(false);

    socket.emit('user:stop-share-screen');
  }

  function stopScreenShareByHost() {
    const [_, sharedTrack] = stream?.getVideoTracks();
    if (sharedTrack) stopScreenShare(sharedTrack);
  }

  function startScreenShare() {
    navigator.mediaDevices
      .getDisplayMedia({
        video: true,
        audio: false,
      })
      .then((screenStream) => {
        const [screenTrack] = screenStream.getTracks();
        stream?.addTrack(screenTrack);

        setSharedScreenTrack(screenTrack);
        setAmISharing(true);

        socket.emit('user:share-screen', { username });

        screenTrack.onended = () => stopScreenShare(screenTrack);
      })
      .catch(error('Failed to share screen'));
  }

  function resetPeer(sharingScreenUsername: string): void {
    peer.disconnect();
    peer.reconnect();

    toast(`${sharingScreenUsername} is sharing his screen`); // * side effect
  }
};

export default useScreenShare;
