import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { UsersSettingsProvider, UsersConnectionProvider } from 'contexts';
import { usePeer, useScreen } from '@hooks/index';

import { LoaderError } from '@common/components';
import { FAILURE_MSG, LOADER_PEER_MSG } from '@common/constants';
import { Kind } from '@common/types';

import useMediaStream from '@hooks/use-media-stream';
import { SocketContext } from '@pages/_app';

import ControlPanel from '@components/control-panel/control-panel';
import SharedScreenStream from '@components/streams/shared-screen-stream';
import Chat from '@components/chat';
import Status from '@components/status';
import { MyStream, OtherStreams } from '@components/streams';

export default function App({ stream }: any) {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const { muted, visible, toggle } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);
  const { startShare, stopShare, screenTrack } = useScreen(stream);

  const [modal, setModal] = useState<any>('hidden');
  const [screen, setScreen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  async function toggleKind(kind: Kind) {
    switch (kind) {
      case 'audio': {
        toggle('audio')(stream);
        socket.emit('user:toggle-audio', myId);
        return;
      }
      case 'video': {
        toggle('video')(stream);
        socket.emit('user:toggle-video', myId);
        return;
      }
      case 'screen': {
        if (screenTrack) {
          setScreen(false);
          stopShare(screenTrack);
          socket.emit('user:stop-share-screen');
        } else {
          setScreen(true);
          await startShare(() => socket.emit('user:stop-share-screen'));
          socket.emit('user:share-screen');
        }
        return;
      }
      case 'fullscreen': {
        setFullscreen(!fullscreen);
        return;
      }
      case 'chat': {
        modal == 'chat' ? setModal('hidden') : setModal('chat');
        return;
      }
      case 'users': {
        modal == 'status' ? setModal('hidden') : setModal('status');
        return;
      }
      default:
        break;
    }
  }

  return (
    <div className="flex">
      <UsersSettingsProvider>
        <div className="sm:flex hidden flex-col p-4 w-full h-screen">
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
            <div className="flex h-full place-items-center place-content-center">
              <SharedScreenStream
                sharedScreen={screenTrack}
                fullscreen={fullscreen}
              />

              <div
                className={`${
                  fullscreen && screenTrack ? 'hidden' : ''
                } flex flex-wrap gap-4 justify-around ${
                  screenTrack ? 'basis-1/6' : ''
                }`}
              >
                <MyStream stream={stream} muted={muted} visible={visible} />
                <OtherStreams />
              </div>
            </div>
          </UsersConnectionProvider>

          <div className="flex items-center">
            <ControlPanel
              visible={visible}
              muted={muted}
              shared={Boolean(screenTrack)}
              screen={screen}
              chat={modal == 'chat'}
              status={modal == 'status'}
              onToggle={toggleKind}
              onLeave={() => router.push('/')}
            />
          </div>
        </div>

        <Chat modal={modal} label="chat" />
        <Status modal={modal} label="status" />
      </UsersSettingsProvider>
    </div>
  );
}
