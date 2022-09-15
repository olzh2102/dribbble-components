import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Tooltip from 'react-tooltip';
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

const ControlPanel = ({
  onFullscreen,
  onAudio,
  toggleChat,
}: ControlPanelProps) => {
  const router = useRouter();

  const [videoActive, setVideoActive] = useState(true);

  const {
    isHost,
    stream,
    amIMuted: isMuted,
    isChatOpen,
    sharedScreenTrack: shared,
    socket,
  } = useContext(QoraContext);
  const { isMyScreenSharing, toggleScreenShare } = useScreenShare();

  function handleVideo() {
    setVideoActive(!videoActive);
    toggleVideo(stream);
  }

  return (
    <>
      {shared && (
        <button
          onClick={onFullscreen}
          className={`${common} bg-slate-800 hover:bg-emerald-700`}
        >
          <ArrowsExpandIcon className="w-6 h-6" />
        </button>
      )}

      <div className="flex flex-auto gap-6 place-content-center items-center">
        <button
          onClick={handleVideo}
          data-for="visibility"
          data-tip={`${videoActive ? 'switch off' : 'switch on'}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          {!videoActive && <CrossLineDiv />}
        </button>
        <Tooltip id="visibility" effect="solid" />

        <button
          onClick={onAudio}
          data-for="audio"
          data-tip={`${videoActive ? 'unmute' : 'mute'}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <MicrophoneIcon className="h-6 w-6" />
          {isMuted && <CrossLineDiv />}
        </button>
        <Tooltip id="audio" effect="solid" />

        <button
          onClick={() => router.push('/')}
          data-for="hangUp"
          data-tip="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <HangUpIcon className="h-7 w-7" />
        </button>
        <Tooltip id="hangUp" effect="solid" />

        <button
          onClick={() => {
            isHost && !isMyScreenSharing && shared
              ? socket.emit('host:remove-user-shared-screen')
              : toggleScreenShare();
          }}
          disabled={!isHost && (shared as any) && !isMyScreenSharing}
          className={`${common} ${
            shared
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
          data-for="shareScreen"
          data-tip="share your screen"
        >
          <ShareScreenIcon className="h-6 w-6" />
        </button>
        <Tooltip id="shareScreen" effect="solid" />

        <button
          data-for="chat"
          data-tip="chat with everyone"
          onClick={toggleChat}
          className={`${common} ${
            isChatOpen
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
        >
          <ChatIcon className="w-6 h-6" />
        </button>
        <Tooltip id="chat" effect="solid" />
      </div>
    </>
  );
};

export default ControlPanel;

type ControlPanelProps = {
  onAudio: () => void;
  toggleChat: () => void;
  onFullscreen: () => void;
};

const common = 'p-3 rounded-xl text-white';
