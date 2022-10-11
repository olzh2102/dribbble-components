import { useContext, useEffect } from 'react';
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

export default function App({ stream }: any) {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const { muted, visible, toggle } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);

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
      default:
        break;
    }
  }

  return (
    <UsersSettingsProvider>
      <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
        <MyStream stream={stream} muted={muted} visible={visible} />
        <OtherStreams />
        <SharedScreenStream />
      </UsersConnectionProvider>

      <ControlPanel
        onToggle={toggleKind}
        onLeave={() => router.push('/')}
        muted={muted}
        visible={visible}
        shared={false}
        chat={false}
        users={false}
      />

      {/* <ChatDialog />
      <ParticipantsDialog /> */}
    </UsersSettingsProvider>
  );
}
