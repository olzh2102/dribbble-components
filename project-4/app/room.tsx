import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { MediaConnection } from 'peerjs';

import { KeyValue, RoomId } from '@common/types';

import { useMediaStream, usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';
import { isHost } from '@common/utils';
import LoaderError from '@common/components/loader-error';
import Botqa from '@components/botqa';
import { ControlPanel, PeerVideo, VideoContainer as MyVideoContainer } from '@components/index';
import { MYSELF } from '@common/constants';

const Room = ({ stream }: { stream: MediaStream }) => {
  const room = useRouter().query.qoraId as RoomId;
  const avatar = useUser().user?.picture!;
  const socket = useContext(SocketContext);
  const { muted, visible, toggle } = useMediaStream({ stream });
  const { peer, me, isLoading } = usePeer({ muted, visible });

  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <LoaderError msg="Setting you up... 🎮" />;
  if (!peer) return <LoaderError msg="Oooops!!! Couldn't create connection. Try again later 🫠" />;

  return (
    <QoraContext.Provider
      value={{
        peer,
        me,
        isHost: isHost(room),
        stream,
        peers,
        setPeers,
      }}
    >
      <div className="flex">
        <div className="flex w-full h-screen flex-col p-4">
          <div className="flex h-full place-items-center place-content-center">
            <Botqa stream={stream} onHostMute={() => toggle('audio')()}>
              <MyVideoContainer id={peer.id} {...{ stream, muted, visible, avatar }}>
                <PeerVideo stream={stream} name={MYSELF} isMe />
              </MyVideoContainer>
            </Botqa>
          </div>

          <div className="flex w-full items-center">
            <ControlPanel
              muted={muted}
              visible={visible}
              onToggle={(kind: 'audio' | 'video') => {
                toggle(kind)();
                socket.emit(`user:toggle-${kind}`, me);
              }}
            />
          </div>
        </div>
      </div>
    </QoraContext.Provider>
  );
};

export default Room;
