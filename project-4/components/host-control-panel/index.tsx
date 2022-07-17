import { HangUpIcon, MicrophoneIcon } from '../../assets/icons';

const HostControlPanel = ({ onToggleAudio, onHangUp, isMuted }: any) => {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden group-hover:block">
      <div className="flex items-center justify-center opacity-50">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <button
            onClick={onToggleAudio}
            type="button"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isMuted}
          >
            <MicrophoneIcon />
            {isMuted && (
              <>
                <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
                <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onHangUp}
            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <HangUpIcon />
          </button>
        </span>
      </div>
    </div>
  );
};

export default HostControlPanel;
