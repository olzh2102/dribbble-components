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
  usersCount,
  onFullscreen,
  onAudio,
  toggleChat,
  toggleParticipants
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
      {/* 📺 make fullscreen */}
      {shared && (
        <button
          onClick={onFullscreen}
          className={`${common} bg-slate-800 hover:bg-emerald-700`}
        >
          <ArrowsExpandIcon className="w-6 h-6" />
        </button>
      )}

      <div className="flex flex-auto gap-6 place-content-center items-center">
        {/* 🎥 toggle your video */}
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
        
        {/* 📣 toggle your audio */}
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

        {/* 📞 leave the call */}
        <button
          onClick={() => router.push('/')}
          data-for="hangUp"
          data-tip="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <HangUpIcon className="h-7 w-7" />
        </button>
        <Tooltip id="hangUp" effect="solid" />

        {/* 🖥 share your screen */}
        <button
          onClick={() => {
            isHost && !isMyScreenSharing && shared
              ? socket.emit('host:remove-user-shared-screen')
              : toggleScreenShare();
          }}
          disabled={!isHost && (shared as any) && !isMyScreenSharing}
          data-for="shareScreen"
          data-tip="share your screen"
          className={`${common} ${
            shared
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
        >
          <ShareScreenIcon className="h-6 w-6" />
        </button>
        <Tooltip id="shareScreen" effect="solid" />

        {/* 💬 chat with everyone */}
        <button
          onClick={toggleChat}
          data-for="chat"
          data-tip="chat with everyone"
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

      {/* 👨‍👩‍👧‍👦 check participants statuses */}
      <ParticipantsCount count={usersCount} onToggleParticipants={toggleParticipants} />
    </>
  );
};

export default ControlPanel;

type ControlPanelProps = {
  usersCount: number;
  onAudio: () => void;
  toggleChat: () => void;
  toggleParticipants: () => void;
  onFullscreen: () => void;
};

const common = 'p-3 rounded-xl text-white';

const ParticipantsCount = ({ count, onToggleParticipants }: { count: number, onToggleParticipants: () => void }) => {
  return (
    <div className="inline-block relative">
      <button onClick={onToggleParticipants} className="inline-block h-10 w-10 rounded-xl overflow-hidden bg-gray-100">
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>
      <span className="place-content-center absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300 text-xs text-center text-black">
        {count}
      </span>
    </div>
  );
};
