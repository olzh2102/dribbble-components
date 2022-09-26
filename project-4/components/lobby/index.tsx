import { useUser } from '@auth0/nextjs-auth0';
import { VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/solid';
import Tooltip from 'react-tooltip';

import { MYSELF } from '@common/constants';
import CrossLineDiv from '@common/components/cross-line-div';
import { MediaSetup } from '@common/types';

import { PeerVideo, VideoContainer } from '..';

const Lobby = ({ stream, muted, visible, onToggle, onRedirectToRoom }: any) => {
  const avatar = useUser().user?.picture || '';

  return (
    <div className="h-screen w-auto grid grid-cols-2 gap-4 place-content-center place-items-center">
      <div className="flex flex-col gap-2">
        <VideoContainer id="me" stream={stream} muted={muted} visible={visible}>
          <PeerVideo key="me" stream={stream} name={MYSELF} isMe={true} />
        </VideoContainer>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onToggle('video')}
            data-for="visibility"
            data-tip={`${!visible ? 'switch on' : 'switch off'}`}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <VideoCameraIcon className="h-6 w-6" />
            {!visible && <CrossLineDiv />}
          </button>
          <Tooltip id="visibility" effect="solid" />

          <button
            onClick={() => onToggle('audio')}
            data-for="audio"
            data-tip={`${muted ? 'unmute' : 'mute'}`}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <MicrophoneIcon className="h-6 w-6" />
            {muted && <CrossLineDiv />}
          </button>
          <Tooltip id="audio" effect="solid" />
        </div>
      </div>

      <button
        onClick={onRedirectToRoom}
        className="p-2 text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200"
      >
        Join qora
      </button>
    </div>
  );
};

export default Lobby;

type LobbyProps = {
  stream: MediaStream;
  initMediaSetup: MediaSetup;
  setup: (key: keyof MediaSetup) => void;
  redirectToRoom: () => void;
};
