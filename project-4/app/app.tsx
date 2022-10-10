import { useUser } from '@auth0/nextjs-auth0';
import LoaderError from '@common/components/loader-error';
import { FAILURE_MSG, LOADER_PEER_MSG, MYSELF } from '@common/constants';
import { KeyValue, PeerId, Nullable } from '@common/types';
import { append } from '@common/utils';
import ActiveSpeaker from '@components/active-speaker';
import ControlPanel from '@components/control-panel/control-panel';
import HostControlPanel from '@components/host-control-panel';
import { PeerVideo, SharedScreen, VideoContainer } from '@components/index';
import VideoPlug from '@components/video-plug';
import useIsAudioActive from '@hooks/use-is-audio-active';
import useMediaStream from '@hooks/use-media-stream';
import usePeer from '@hooks/use-peer';
import { SocketContext } from '@pages/_app';
import { MutedIcon } from 'assets/icons';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UsersConnectionContext = createContext<any>({});
export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export default function App({ stream }: any) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { muted, visible, toggle } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  return (
    <UsersSettingsProvider>
      <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
        <MyStream stream={stream} muted={muted} visible={visible} />
        <OtherStreams />
        {/* <SharedScreenStream /> */}
      </UsersConnectionProvider>

      <ControlPanel
        onToggle={(kind: any) => {
          if (kind == 'audio') {
            toggle('audio')(stream);
            socket.emit('user:toggle-audio', myId);
          }

          if (kind == 'video') {
            toggle('video')(stream);
            socket.emit('user:toggle-video', myId);
          }
        }}
      />

      {/* <ChatDialog />
      <ParticipantsDialog /> */}
    </UsersSettingsProvider>
  );
}

const UsersSettingsProvider = ({ children }: any) => {
  const socket = useContext(SocketContext);

  const [streams, setStreams] = useState<Record<PeerId, JSX.Element>>({});

  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  const [avatars, setAvatars] = useState<KeyValue<string>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  useEffect(() => {
    socket.on('user:toggled-audio', (peerId: PeerId) =>
      setIsMuted(append({ [peerId]: !isMuted[peerId] }))
    );

    socket.on('user:toggled-video', (peerId: PeerId) =>
      setIsHidden(append({ [peerId]: !isHidden[peerId] }))
    );
  }, [isMuted, isHidden]);

  return (
    <UsersStateContext.Provider
      value={{ streams, isMuted, isHidden, avatars, sharedScreenTrack }}
    >
      <UsersUpdaterContext.Provider
        value={{
          setIsMuted,
          setIsHidden,
          setAvatars,
          setStreams,
          setSharedScreenTrack,
        }}
      >
        {children}
      </UsersUpdaterContext.Provider>
    </UsersStateContext.Provider>
  );
};

const UsersConnectionProvider = ({ stream, peer, myId, children }: any) => {
  const user = useUser().user!;

  const socket = useContext(SocketContext);
  const {
    setIsMuted,
    setIsHidden,
    setAvatars,
    setStreams,
    setSharedScreenTrack,
  } = useContext(UsersUpdaterContext);

  const { muted, visible } = useMediaStream(stream);
  const [users, setUsers] = useState({});

  // * user a accepts user b and make a call
  useEffect(() => {
    if (!peer) return;

    socket.on('user:joined', ({ id, name, picture, initMediaSetup }: any) => {
      console.table({
        'call-friend': 'call friend',
        'user-id': id,
        'user-name': name,
        initMediaSetup,
      });

      const call = peer.call(
        id,
        stream, // my stream
        {
          metadata: {
            user: {
              name: user.name,
              picture: user.picture,
            },
            mediaSetup: { isMuted: muted, isHidden: !visible },
          },
        }
      );

      call.on('stream', (stream: MediaStream) => {
        setStreams(
          append({
            [id]: <PeerVideo stream={stream} isMe={false} name={name} />,
          })
        );
        const screenTrack = stream.getVideoTracks()[1];
        if (screenTrack) setSharedScreenTrack(screenTrack);
      }); // * friend's stream
      call.on('close', () => toast(`${name} has left the room`));

      setUsers(append({ [id]: call }));
      setIsMuted(append({ [id]: initMediaSetup.isMuted }));
      setIsHidden(append({ [id]: initMediaSetup.isHidden }));
      setAvatars(append({ [id]: picture }));
    });

    return () => {
      socket.off('user:joined');
    };
  }, [peer]);

  // * user b answers to user a's call
  useEffect(() => {
    if (!peer) return;

    peer.on('call', (call: any) => {
      const { peer, metadata } = call;
      const { user, mediaSetup } = metadata;

      setUsers(append({ [peer]: call }));
      setIsMuted(append({ [peer]: mediaSetup.isMuted }));
      setIsHidden(append({ [peer]: mediaSetup.isHidden }));
      setAvatars(append({ [peer]: user.picture }));

      call.answer(stream); // * answers incoming call with his/her stream

      console.table({
        'answer-friend': 'answer friend',
        'user-id': peer,
        'user-name': user.name,
      });

      call.on('stream', (stream: MediaStream) => {
        setStreams(
          append({
            [peer]: <PeerVideo stream={stream} isMe={false} name={user.name} />,
          })
        );
        const screenTrack = stream.getVideoTracks()[1];
        if (screenTrack) setSharedScreenTrack(screenTrack);
      }); // * receiver's stream
      call.on('close', () => toast(`${user.name} has left the room`));
    });
  }, [peer]);

  return (
    <UsersConnectionContext.Provider value={{ peer, myId, users }}>
      {children}
    </UsersConnectionContext.Provider>
  );
};

const OtherStreams = () => {
  const { streams, isMuted, isHidden, avatars } = useContext(UsersStateContext);

  return (
    <div className="flex gap-4">
      <div className="flex flex-wrap gap-4 justify-around">
        {Object.entries(streams).map(([id, element]: any) => (
          <VideoContainer
            id={id}
            mediaSetup={{ isMuted: isMuted[id], isHidden: isHidden[id] }}
            userPicture={avatars[id]}
            stream={element.props.stream}
            onMutePeer={() => {}}
            onRemovePeer={() => {}}
          >
            {element}
          </VideoContainer>
        ))}
      </div>
    </div>
  );
};

const MyStream = ({ stream, muted, visible }: any) => {
  const avatar = useUser().user!.picture || '';
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      mediaSetup={{ isMuted: muted, isHidden: !visible }}
      stream={stream}
      userPicture={avatar}
    >
      <PeerVideo stream={stream} name={MYSELF} isMe={true} />
    </VideoContainer>
  );
};

const SharedScreenStream = () => {
  const { sharedScreenTrack } = useContext(UsersStateContext);

  return sharedScreenTrack ? (
    <SharedScreen sharedScreenTrack={sharedScreenTrack} />
  ) : null;
};
