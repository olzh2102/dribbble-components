import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneMissedCallIcon as HangUpIcon,
  UploadIcon as ShareScreenIcon,
} from '@heroicons/react/solid';
import { toggleVideo } from '../../common/utils';
import { Nullable } from 'common/types';
import { QoraContext } from '@pages/qora/[qoraId]';

const ControlPanel = ({
  onAudio,
  sharedScreenTrack,
  isMuted,
  setSharedScreenTrack,
}: {
  onAudio: () => void;
  sharedScreenTrack: Nullable<MediaStreamTrack>;
  isMuted: boolean;
  setSharedScreenTrack: Dispatch<SetStateAction<Nullable<MediaStreamTrack>>>;
}) => {
  const router = useRouter();
  const { socket, peer, user, isHost, stream } = useContext(QoraContext);
  const [videoActive, setVideoActive] = useState(true);

  const handleVideo = () => {
    setVideoActive(!videoActive);
    toggleVideo(stream);
  };

  const handleHangUp = () => router.push('/');

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
      if (sharedScreenTrack) stopShareScreen(sharedScreenTrack);
    });

    return () => {
      socket.off('screen-shared');
      socket.off('screen-sharing-stopped');
      socket.off('shared-video-removed');
    };
  }, [peer]);

  function stopShareScreen(screenTrack: MediaStreamTrack) {
    screenTrack.stop();
    stream?.removeTrack(screenTrack);
    setSharedScreenTrack(null);
    setIsMyScreenSharing(false);
    socket.emit('stop-sharing-my-screen');
  }

  async function handleShareScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const screenTrack = screenStream.getTracks()[0];
    stream?.addTrack(screenTrack);
    setSharedScreenTrack(screenTrack);
    setIsMyScreenSharing(true);

    socket.emit('share-my-screen', { username: user?.name });

    screenTrack.onended = () => stopShareScreen(screenTrack);
  }

  function toggleShareScreen() {
    if (isHost && !isMyScreenSharing && sharedScreenTrack) {
      socket.emit('remove-peer-shared-video');
      return;
    }
    if (!sharedScreenTrack) handleShareScreen();
    else stopShareScreen(sharedScreenTrack);
  }

  return (
    <div className="flex gap-6 mt-6 place-content-center absolute bottom-6">
      <button
        onClick={handleVideo}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
      >
        <VideoCameraIcon className="h-6 w-6" />
        {!videoActive && (
          <>
            <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
            <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
          </>
        )}
      </button>
      <button
        onClick={onAudio}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
      >
        <MicrophoneIcon className="h-6 w-6" />
        {isMuted && (
          <>
            <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
            <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
          </>
        )}
      </button>
      <button
        onClick={handleHangUp}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400"
      >
        <HangUpIcon className="h-6 w-6" />
      </button>
      <button
        onClick={toggleShareScreen}
        type="button"
        className={`inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-${
          sharedScreenTrack ? 'indigo' : 'red'
        }-600 hover:bg-${sharedScreenTrack ? 'indigo' : 'red'}-400`}
        disabled={!isHost && (sharedScreenTrack as any) && !isMyScreenSharing}
      >
        <ShareScreenIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ControlPanel;
