import { VideoCameraIcon, MicrophoneIcon } from '@heroicons/react/solid';
import { MYSELF } from '@common/constants';
import { toggleVideo } from '@common/utils';
import { PeerVideo } from '..';

const Lobby = ({
  stream,
  media,
  setIsVisible,
  setIsMuted,
  setIsLobby,
}: any) => {
  return (
    <div className="flex gap-6 h-screen place-items-center place-content-center relative p-6">
      <div className="flex flex-col column gap-2">
        <PeerVideo key={'me'} stream={stream} name={MYSELF} isMe={true} />
        <div>
          <button
            onClick={() => {
              setIsVisible();
              toggleVideo(stream);
            }}
            type="button"
            className="inline-flex items-center p-3 mr-2 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <VideoCameraIcon className="h-6 w-6" />
            {!media.isVisible && (
              <>
                <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
                <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
              </>
            )}
          </button>
          <button
            onClick={setIsMuted}
            type="button"
            className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <MicrophoneIcon className="h-6 w-6" />
            {media.isMuted && (
              <>
                <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
                <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
              </>
            )}
          </button>
        </div>
      </div>
      <button
        onClick={setIsLobby}
        type="button"
        className="inline-flex items-center px-6 py-2 mb-6 border border-transparent text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Join qora
      </button>
    </div>
  );
};

export default Lobby;
