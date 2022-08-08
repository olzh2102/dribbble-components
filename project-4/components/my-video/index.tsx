import { useContext } from 'react';
import { ChatAltIcon as ChatIcon } from '@heroicons/react/outline';

import { QoraContext } from '@pages/qora/[qoraId]';
import ControlPanel from '@components/control-panel';
import { toggleAudio } from '@common/utils';
import { MYSELF } from '@common/constants';
import { MutedIcon } from 'assets/icons';
import React from 'react';
import { PeerVideo } from '..';

const MyVideo = ({
  amIMuted,
  setAmIMuted,
  onToggleChat,
}: {
  amIMuted: boolean;
  setAmIMuted: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleChat: () => void;
}) => {
  const { me, stream, socket } = useContext(QoraContext);

  function handleAudio() {
    socket.emit('toggle-audio-status', me);
    setAmIMuted(!amIMuted);
    toggleAudio(stream);
  }

  return (
    <>
      <div className="absolute right-6 bottom-24 w-64">
        <div className="relative group h-fit">
          <PeerVideo stream={stream} name={MYSELF} />

          {amIMuted && (
            <div className="absolute top-3 right-3">
              <MutedIcon />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-screen px-6 absolute bottom-6 items-center z-50">
        <div className="w-9" />
        <div className="flex flex-auto gap-6 place-content-center">
          <ControlPanel isMuted={amIMuted} onAudio={handleAudio} />
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
