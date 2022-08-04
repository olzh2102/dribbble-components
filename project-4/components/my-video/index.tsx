import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ChatAltIcon as ChatIcon } from '@heroicons/react/outline';

import { QoraContext } from '@pages/qora/[qoraId]';
import ControlPanel from '@components/control-panel';
import Video from '@components/video';
import { toggleAudio } from '@common/utils';
import { MYSELF } from '@common/constants';
import { MutedIcon } from 'assets/icons';
import React from 'react';

const MyVideo = ({ onToggleChat }: { onToggleChat: () => void }) => {
  const { me, stream, socket } = useContext(QoraContext);

  const [isMuted, setIsMuted] = useState(false);

  function handleAudio() {
    console.log(me);
    socket.emit('toggle-audio-status', me);
    setIsMuted(!isMuted);
    toggleAudio(stream);
  }

  useEffect(() => {
    socket.on('member-muted', (userId: string) => {
      if (userId === me) {
        toggleAudio(stream);
        setIsMuted(true);
        toast('You are muted');
      }
    });

    return () => {
      socket.off('member-muted');
    };
  }, [me]);

  return (
    <>
      <div className="absolute right-6 bottom-24 w-64">
        <div className="relative group h-fit">
          <Video stream={stream} muted={true} />

          <p className="font-medium absolute bottom-3 left-4 text-xs">
            <span className="text-white">{MYSELF}</span>
          </p>

          {/* <ActiveSpeakerIcon stream={stream} /> */}

          {isMuted && (
            <div className="absolute top-3 right-3">
              <MutedIcon />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-screen px-6 absolute bottom-6 items-center z-50">
        <div className="w-9" />
        <div className="flex flex-auto gap-6 place-content-center">
          <ControlPanel isMuted={isMuted} onAudio={handleAudio} />
        </div>
        <div className="w-9">
          <button onClick={onToggleChat}>
            <ChatIcon className="w-9 h-9 stroke-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MyVideo;
