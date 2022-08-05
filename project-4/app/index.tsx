import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ChatAltIcon as ChatIcon } from '@heroicons/react/outline';

import { QoraContext } from '@pages/qora/[qoraId]';
import {
  ControlPanel,
  HostControlPanel,
  PeerVideo,
  SharedScreen,
} from '@components/index';
import { usePeerOnJoinRoom, usePeerOnAnswer } from '@hooks/index';
import { toggleAudio } from 'common/utils';
import { KeyValue } from 'common/types';
import { MutedIcon } from 'assets/icons';
import { MYSELF } from '@common/constants';

const App = ({ toggleChat }: { toggleChat: () => void }) => {
  console.log('render app');

  const {
    me,
    isHost,
    peer,
    peers,
    stream,
    socket,
    sharedScreenTrack,
    setSharedScreenTrack,
  } = useContext(QoraContext);
  const [fullscreen, setFullscreen] = useState(false);

  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [isRemoved, setIsRemoved] = useState<KeyValue<boolean>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  usePeerOnJoinRoom(addVideoStream);
  usePeerOnAnswer(addVideoStream);

  useEffect(() => {
    if (!stream) return;
    if (me) addVideoStream({ id: me, stream, isMe: true, name: MYSELF });
  }, [me, stream]);

  useEffect(() => {
    socket.on('member-muted', (peerId: string) => {
      toggleAudio(stream);
      setIsMuted((prev) => ({ ...prev, [peerId]: true }));
      if (peerId === me) toast('You are muted');
    });

    socket.on('member-left', (peerId: string) => {
      peers[peerId]?.close();
      setIsRemoved((prev) => ({ ...prev, [peerId]: true }));
    });

    socket.on('audio-status-toggled', (peerId: string) => {
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
    });

    return () => {
      socket.off('member-muted');
      socket.off('member-left');
      socket.off('audio-status-toggled');
    };
  }, [peers]);

  function addVideoStream({
    id,
    name,
    stream,
    isMe,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
    isMe?: boolean;
  }) {
    setVideos((prev) => ({
      ...prev,
      [id]: <PeerVideo key={id} stream={stream} name={name} isMe={isMe} />,
    }));

    const screenTrack = stream.getVideoTracks()[1];
    if (screenTrack) setSharedScreenTrack(screenTrack);
  }

  function handleRemovePeer(peerId: string) {
    socket.emit('remove-peer', peerId);
    peers[peerId]?.close();
  }

  function handleMutePeer(peerId: string) {
    console.log(peerId);
    socket.emit('mute-peer', peerId);
    setIsMuted((prev) => ({ ...prev, [peerId]: true }));
  }

  function handleAudio() {
    socket.emit('toggle-audio-status', me);
    setIsMuted((prev) => ({ ...prev, [me]: !prev[me] }));
    toggleAudio(stream);
  }

  if (!peer || !stream) return <span>Loading...</span>;

  let sharedScreenClasses = '';
  if (sharedScreenTrack) {
    sharedScreenClasses += 'flex justify-center';
    if (fullscreen) sharedScreenClasses += 'basis-6/6';
    else sharedScreenClasses += 'basis-5/6';
  }

  return (
    <>
      <div className="flex gap-4">
        {/* shared screen stream video */}
        <div className={sharedScreenClasses}>
          <SharedScreen sharedScreenTrack={sharedScreenTrack} />
        </div>

        {/* peer stream videos */}
        <div
          className={`${
            fullscreen && sharedScreenTrack ? 'hidden' : ''
          } flex flex-wrap gap-4 justify-around ${
            sharedScreenTrack ? 'basis-1/6' : ''
          }`}
        >
          {Object.entries(videos).map(
            ([id, element]) =>
              !isRemoved[id] && (
                <div
                  key={id}
                  className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
                >
                  {element}

                  {isHost && me !== id && (
                    <HostControlPanel
                      onRemovePeer={() => handleRemovePeer(id)}
                      onMutePeer={() => handleMutePeer(id)}
                      isMuted={isMuted[id]}
                    />
                  )}

                  {isMuted[id] && (
                    <div className="absolute top-3 right-3">
                      <MutedIcon />
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </div>

      <div className="flex w-screen px-6 absolute bottom-6 items-center z-50">
        {sharedScreenTrack && (
          <button
            className="bg-white"
            onClick={() => {
              setFullscreen(!fullscreen);
              console.log('here');
            }}
          >
            To full screen
          </button>
        )}
        <div className="w-9" />
        <div className="flex flex-auto gap-6 place-content-center">
          <ControlPanel isMuted={isMuted[me]} onAudio={handleAudio} />
        </div>
        <div className="w-9">
          <button onClick={toggleChat}>
            <ChatIcon className="w-9 h-9 stroke-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
