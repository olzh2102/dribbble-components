import { useRouter } from 'next/router';
import { useState } from 'react';
import { VideoIcon, MicrophoneIcon, HangUpIcon } from '../../assets/icons';
import { toggleVideo } from '../../common/utils';

const ControlPanel = ({ stream, onAudio, constraints, isMuted }: any) => {
  const router = useRouter();
  const [videoActive, setVideoActive] = useState(constraints.video);

  const handleVideo = () => {
    setVideoActive(!videoActive);
    toggleVideo(stream);
  };

  const handleHangUp = () => router.push('/');

  return (
    <div className="flex gap-6 mt-6 place-content-center">
      <button
        onClick={handleVideo}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
      >
        <VideoIcon />
        {!videoActive && (
          <>
            <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
            <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
          </>
        )}
      </button>
      <button
        onClick={onAudio}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
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
        onClick={handleHangUp}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400"
      >
        <HangUpIcon />
      </button>
    </div>
  );
};

export default ControlPanel;
