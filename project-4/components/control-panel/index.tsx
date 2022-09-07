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
import CrossLineDiv from '@common/components/cross-line-div';

const ControlPanel = ({ onAudio, isMuted }: ControlPanelProps) => {
  const router = useRouter();

  const [videoActive, setVideoActive] = useState(true);

  const { isHost, stream, sharedScreenTrack: shared } = useContext(QoraContext);
  const { isMyScreenSharing, toggleScreenShare } = useScreenShare();

  function handleVideo() {
    setVideoActive(!videoActive);
    toggleVideo(stream);
  }

  return (
    <>
      <button
        onClick={handleVideo}
        className={`${common + 'bg-slate-800 hover:bg-indigo-700 relative'}`}
      >
        <VideoCameraIcon className="h-6 w-6" />
        {!videoActive && <CrossLineDiv />}
      </button>

      <button
        onClick={onAudio}
        className={`${common + 'bg-slate-800 hover:bg-indigo-700 relative'}`}
      >
        <MicrophoneIcon className="h-6 w-6" />
        {isMuted && <CrossLineDiv />}
      </button>

      <button
        onClick={() => router.push('/')}
        className={`${common + 'bg-red-600 hover:bg-red-400'}`}
      >
        <HangUpIcon className="h-6 w-6" />
      </button>

      <button
        onClick={toggleScreenShare}
        disabled={!isHost && (shared as any) && !isMyScreenSharing}
        className={`${common}${
          shared
            ? 'bg-indigo-600 hover:bg-indigo-400'
            : 'bg-red-600 hover:bg-red-400'
        }`}
      >
        <ShareScreenIcon className="h-6 w-6" />
      </button>
    </>
  );
};

export default ControlPanel;

type ControlPanelProps = {
  onAudio: () => void;
  isMuted: boolean;
};

const common = 'p-3 rounded-xl text-white ';
