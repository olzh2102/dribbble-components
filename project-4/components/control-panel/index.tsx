import { useRouter } from 'next/router';
import { useContext } from 'react';
import Tooltip from 'react-tooltip';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneMissedCallIcon as HangUpIcon,
  UploadIcon as ShareScreenIcon,
  ArrowsExpandIcon,
  ChatIcon,
} from '@heroicons/react/solid';

import { QoraContext } from '@pages/qora/[qoraId]';
import CrossLineDiv from '@common/components/cross-line-div';
import { MediaSetup } from '@common/types';

const ControlPanel = ({ onToggle, onLeave, muted, visible, chat }: any) => {
  return (
    <div className="flex w-full items-center">
      {false && (
        <button
          onClick={() => onToggle('fullscreen')}
          className={`${common} bg-slate-800 hover:bg-emerald-700`}
        >
          <ArrowsExpandIcon className="w-6 h-6" />
        </button>
      )}
      <div className="flex flex-auto gap-6 place-content-center items-center">
        <button
          onClick={() => onToggle('video')}
          data-for="visibility"
          data-tip={`${visible ? 'switch off' : 'switch on'}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          {!visible && <CrossLineDiv />}
        </button>
        <Tooltip id="visibility" effect="solid" />

        <button
          onClick={() => onToggle('audio')}
          data-for="audio"
          data-tip={`${muted ? 'unmute' : 'mute'}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <MicrophoneIcon className="h-6 w-6" />
          {muted && <CrossLineDiv />}
        </button>
        <Tooltip id="audio" effect="solid" />

        <button
          onClick={onLeave}
          data-for="hangUp"
          data-tip="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <HangUpIcon className="h-7 w-7" />
        </button>
        <Tooltip id="hangUp" effect="solid" />

        <button
          data-for="chat"
          data-tip="chat with everyone"
          onClick={() => onToggle('chat')}
          className={`${common} ${
            chat
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
        >
          <ChatIcon className="w-6 h-6" />
        </button>
        <Tooltip id="chat" effect="solid" />
      </div>
    </div>
  );
};

export default ControlPanel;

type ControlPanelProps = {
  usersCount: number;
  isChatOpen: boolean;
  setMediaSetup: (key: keyof MediaSetup) => void;
  toggleChat: (arg: boolean) => void;
  onFullscreen: () => void;
};

const common = 'p-3 rounded-xl text-white';

const ParticipantsCount = ({ count }: { count: number }) => {
  return (
    <div className="inline-block relative">
      <button className="inline-block h-10 w-10 rounded-xl overflow-hidden bg-gray-100">
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
