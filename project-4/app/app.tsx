import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { UsersSettingsProvider, UsersConnectionProvider } from 'contexts';
import { usePeer } from '@hooks/index';

import LoaderError from '@common/components/loader-error';
import { FAILURE_MSG, LOADER_PEER_MSG } from '@common/constants';
import { Kind } from '@common/types';

import useMediaStream from '@hooks/use-media-stream';
import { SocketContext } from '@pages/_app';

import ControlPanel from '@components/control-panel/control-panel';
import SharedScreenStream from '@components/streams/shared-screen-stream';
import { MyStream, OtherStreams } from '@components/streams';
import Chat from '@components/chat';

export default function App({ stream }: any) {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const { muted, visible, toggle } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);

  const [chatModal, setChatModal] = useState('hidden');

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  function toggleKind(kind: Kind) {
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
        return;
      }
      case 'chat': {
        setChatModal(chatModal === 'open' ? 'close' : 'open');
        return;
      }
      default:
        break;
    }
  }

  return (
    <div className="flex">
      <UsersSettingsProvider>
        <div
          className={`${
            chatModal == 'open' ? 'sm:flex hidden' : 'flex'
          } w-full h-screen flex-col p-4`}
        >
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
            <div className="flex h-full place-items-center place-content-center">
              <MyStream stream={stream} muted={muted} visible={visible} />
              <OtherStreams />
              <SharedScreenStream />
            </div>
          </UsersConnectionProvider>

          <div className="flex w-full items-center">
            <ControlPanel
              onToggle={toggleKind}
              onLeave={() => router.push('/')}
              muted={muted}
              visible={visible}
              shared={false}
              isChatOpen={chatModal === 'open'}
              users={false}
            />
          </div>
        </div>

        <div
          className={`${
            chatModal === 'hidden'
              ? 'hidden'
              : chatModal === 'open'
              ? 'animate-on-open-chat'
              : 'animate-on-close-chat'
          } h-screen w-screen max-w-full sm:max-w-md`}
          onAnimationEnd={() => chatModal === 'close' && setChatModal('hidden')}
        >
          <Chat onClose={() => setChatModal('close')} title="Meeting Chat" />
        </div>

        {/* <ParticipantsDialog /> */}
      </UsersSettingsProvider>
    </div>
  );
}
