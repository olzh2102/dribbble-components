import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneMissedCallIcon as HangUpIcon,
  UploadIcon as ShareScreenIcon,
} from '@heroicons/react/solid';
import {
  ChatAltIcon as ChatIcon,
  ArrowsExpandIcon,
} from '@heroicons/react/outline';
import { toggleVideo } from 'common/utils';
import { QoraContext } from '@pages/qora/[qoraId]';
import { useScreenShare } from '@hooks/index';
import CrossLineDiv from '@common/components/cross-line-div';

const ControlPanel = ({ onAudio, isMuted, toggleChat }: ControlPanelProps) => {
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
      {shared && (
        <button
          onClick={() => console.log('FULLSCREEN')}
          className={`${common} bg-slate-800 hover:bg-indigo-700 relative`}
        >
          <ArrowsExpandIcon className="w-6 h-6" />
        </button>
      )}
      <div className="flex flex-auto gap-6 place-content-center">
        <button
          onClick={handleVideo}
          className={`${common} + bg-slate-800 hover:bg-indigo-700 relative`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          {!videoActive && <CrossLineDiv />}
        </button>
        <button
          onClick={onAudio}
          type="button"
          className={`${common} bg-slate-800 hover:bg-indigo-700 relative`}
        >
          <MicrophoneIcon className="h-6 w-6" />
          {isMuted && <CrossLineDiv />}
        </button>
        <button
          onClick={() => router.push('/')}
          className={`${common} bg-red-600 hover:bg-red-400`}
        >
          <HangUpIcon className="h-6 w-6" />
        </button>
        <button
          onClick={toggleScreenShare}
          disabled={!isHost && (shared as any) && !isMyScreenSharing}
          className={`${common} ${
            shared
              ? 'bg-indigo-600 hover:bg-indigo-400'
              : 'bg-red-600 hover:bg-red-400'
          }`}
        >
          <ShareScreenIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="w-9">
        <button onClick={toggleChat}>
          <ChatIcon className="w-9 h-9 stroke-white" />
        </button>
      </div>
    </>
  );
};

export default ControlPanel;

type ControlPanelProps = {
  onAudio: () => void;
  isMuted: boolean;
  toggleChat: () => void;
};

const common = 'p-3 rounded-xl text-white';
