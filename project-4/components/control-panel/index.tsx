import { VideoIcon, MicrophoneIcon, HangUpIcon } from '../../assets/icons';

const ControlPanel = ({ onVideo, onAudio, onHangUp }: any) => {
  return (
    <div className="flex gap-4 place-content-center">
      <button
        onClick={onVideo}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <VideoIcon />
      </button>
      <button
        onClick={onAudio}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MicrophoneIcon />
      </button>
      <button
        onClick={onHangUp}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400	focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <HangUpIcon />
      </button>
    </div>
  );
};

export default ControlPanel;
