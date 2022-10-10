import { useContext } from 'react';
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

import { QoraContext } from '@pages/qora/[qoraId]';
import { useScreenShare } from '@hooks/index';
import CrossLineDiv from '@common/components/cross-line-div';
import { SocketContext } from '@pages/_app';
import useMediaStream from '@hooks/use-media-stream';
import { UsersStateContext } from 'app/app';

const ControlPanel = ({ stream, onToggle, onLeave }: any) => {
  const socket = useContext(SocketContext);
  const { muted, visible } = useMediaStream(stream);
  const { sharedScreenTrack: shared } = useContext(UsersStateContext);
  const { isMyScreenSharing, toggleScreenShare } = useScreenShare();

  return (
    <>
      {shared && (
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
          data-tip={`${!visible ? 'switch on' : 'switch off'}`}
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
          onClick={() => {
            false && !isMyScreenSharing && shared
              ? socket.emit('host:remove-user-shared-screen')
              : toggleScreenShare();
          }}
          disabled={!false && (shared as any) && !isMyScreenSharing}
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
      </div>
    </>
  );
};

export default ControlPanel;

const common = 'p-3 rounded-xl text-white';
