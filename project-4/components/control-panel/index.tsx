import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneMissedCallIcon as HangUpIcon,
  UploadIcon as ShareScreenIcon,
} from '@heroicons/react/solid';
import { toggleVideo } from 'common/utils';
import { QoraContext } from '@pages/qora/[qoraId]';
import { useScreenShare } from '@hooks/index';

const ControlPanel = ({
  onAudio,
  isMuted,
}: {
  onAudio: () => void;
  isMuted: boolean;
}) => {
  const router = useRouter();
  const { isHost, stream, sharedScreenTrack } = useContext(QoraContext);
  const [videoActive, setVideoActive] = useState(true);

  const handleVideo = () => {
    setVideoActive(!videoActive);
    toggleVideo(stream);
  };

  const { isMyScreenSharing, toggleScreenShare } = useScreenShare();

  return (
    <>
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
        onClick={() => router.push('/')}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400"
      >
        <HangUpIcon className="h-6 w-6" />
      </button>
      <button
        onClick={toggleScreenShare}
        type="button"
        className={`inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-${
          sharedScreenTrack ? 'indigo' : 'red'
        }-600 hover:bg-${sharedScreenTrack ? 'indigo' : 'red'}-400`}
        disabled={!isHost && (sharedScreenTrack as any) && !isMyScreenSharing}
      >
        <ShareScreenIcon className="h-6 w-6" />
      </button>
    </>
  );
};

export default ControlPanel;
