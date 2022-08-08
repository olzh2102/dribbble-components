import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { HostControlPanel, PeerVideo, SharedScreen } from '@components/index';
import { usePeerOnJoinRoom, usePeerOnAnswer } from '@hooks/index';
import { toggleAudio } from 'common/utils';
import { KeyValue } from 'common/types';
import { MutedIcon } from 'assets/icons';

const App = ({
  setAmIMuted,
}: {
  setAmIMuted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [isRemoved, setIsRemoved] = useState<KeyValue<boolean>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  usePeerOnJoinRoom(addVideoStream);
  usePeerOnAnswer(addVideoStream);

  useEffect(() => {
    socket.on('member-muted', (peerId: string) => {
      toggleAudio(stream);
      setIsMuted((prev) => ({ ...prev, [peerId]: true }));
      if (peerId === me) {
        toast('You are muted');
        setAmIMuted(true);
      }
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
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) {
    setVideos((prev) => ({
      ...prev,
      [id]: <PeerVideo key={id} stream={stream} name={name} />,
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

  if (!peer || !stream) return <span>Loading...</span>;

  return (
    <>
      <div className="flex gap-4">
        {/* shared screen stream video */}
        {sharedScreenTrack && (
          <div className="basis-5/6 flex justify-center">
            <SharedScreen sharedScreenTrack={sharedScreenTrack} />
          </div>
        )}

        {/* peer stream videos */}
        <div
          className={`flex flex-wrap gap-4 justify-around ${
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

                  {isHost && (
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
    </>
  );
};

export default App;
