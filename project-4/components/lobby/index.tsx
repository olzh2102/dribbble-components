import { VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/solid';

import { MYSELF } from '@common/constants';
import { toggleVideo } from '@common/utils';
import CrossLineDiv from '@common/components/cross-line-div';

import { PeerVideo } from '..';

const Lobby = ({ stream, media, setMedia, redirectToRoom }: LobbyProps) => {
  if (stream) stream.getVideoTracks()[0].enabled = media.isVisible;

  function setVisibility() {
    setMedia('isVisible');
    toggleVideo(stream);
  }

  return (
    <div className="h-screen w-auto grid grid-cols-2 gap-4 place-content-center place-items-center">
      <div className="flex flex-col gap-2">
        <PeerVideo key="me" stream={stream} name={MYSELF} isMe={true} />

        <div className="flex justify-end gap-2">
          <button
            onClick={setVisibility}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <VideoCameraIcon className="h-6 w-6" />
            {!media.isVisible && <CrossLineDiv />}
          </button>

          <button
            onClick={() => setMedia('isMuted')}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <MicrophoneIcon className="h-6 w-6" />
            {media.isMuted && <CrossLineDiv />}
          </button>
        </div>
      </div>

      <button
        onClick={redirectToRoom}
        type="button"
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
  media: { isMuted: boolean; isVisible: boolean };
  setMedia: (key: 'isMuted' | 'isVisible') => void;
  redirectToRoom: () => void;
};
