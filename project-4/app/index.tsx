import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { MediaConnection } from 'peerjs';
import { ToastContainer } from 'react-toastify';

import {
  FAILURE_MSG,
  LOADER_PEER_MSG,
  MYSELF,
  TOAST_PROPS,
} from '@common/constants';
import { isHost } from '@common/utils';
import { KeyValue, Nullable, RoomId } from '@common/types';

import useMediaStream from '@hooks/use-media-stream';
import { usePeer } from '@hooks/index';
import { SocketContext } from '@pages/_app';
import { QoraContext } from '@pages/qora/[qoraId]';

import Botqa from '@components/botqa';
import Chat from '@components/chat';
import ControlPanel from '@components/control-panel';
import LoaderError from '@common/components/loader-error';
import { PeerVideo, VideoContainer } from '@components/index';

export const UserUpdaterContext = createContext<any>({});
export const UserStateContext = createContext<any>({});

const Room = ({ stream }: { stream: MediaStream }) => {
  const router = useRouter();
  const userPicture = useUser().user!.picture;
  const socket = useContext(SocketContext);

  const { muted, visible, toggle } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);
  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});
  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  // * users states
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  const [avatar, setAvatar] = useState<KeyValue<string>>({});

  // * side features
  const [fullscreen, setFullscreen] = useState(false);
  const [chatStatus, setChatStatus] = useState<Chat>('hidden');
  const [count, setCount] = useState(1);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  async function toggleKind(kind: Kind) {
    switch (kind) {
      case 'audio': {
        toggle('audio')(stream);
        socket.emit('user:toggle-audio', myId);
        return;
      }
      case 'video': {
        toggle('video')(stream);
        await toggleVideo();
        socket.emit('user:toggle-video', myId);
        return;
      }
      case 'chat': {
        setChatStatus(chatStatus === 'open' ? 'close' : 'open');
        return;
      }
      case 'fullscreen': {
        setFullscreen(!fullscreen);
        return;
      }
      default:
        break;
    }
  }

  if (!isPeerReady) return <LoaderError msg={LOADER_PEER_MSG} />;
  if (!peer) return <LoaderError msg={FAILURE_MSG} />;

  return (
    <QoraContext.Provider
      value={{
        peer,
        myId,
        isHost: isHost(router.query.qoraId as RoomId),
        mediaSetup: { isMuted: muted, isHidden: !visible },
        stream,
        peers,
        setCount,
        setPeers,
        sharedScreenTrack,
        setSharedScreenTrack,
      }}
    >
      <div className="flex">
        <div
          className={`${
            chatStatus === 'open' ? 'sm:flex hidden' : 'flex'
          } w-full h-screen flex-col p-4`}
        >
          <div className="flex h-full place-items-center place-content-center">
            <UserStateContext.Provider value={{ isMuted, isHidden, avatar }}>
              <UserUpdaterContext.Provider
                value={{ setIsMuted, setIsHidden, setAvatar }}
              >
                <Botqa
                  onMuteUser={() => toggle('audio')(stream)}
                  fullscreen={fullscreen}
                >
                  <VideoContainer
                    id={myId}
                    mediaSetup={{ isMuted: muted, isHidden: !visible }}
                    stream={stream}
                    userPicture={userPicture || ''}
                  >
                    <PeerVideo stream={stream} name={MYSELF} isMe={true} />
                  </VideoContainer>
                </Botqa>
              </UserUpdaterContext.Provider>
            </UserStateContext.Provider>
          </div>

          <div className="flex w-full items-center">
            <ControlPanel
              onLeave={() => router.push('/')}
              onToggle={toggleKind}
              isChatOpen={chatStatus === 'open'}
              usersCount={count + Number(Boolean(myId))}
            />
          </div>
        </div>

        <div
          className={`${
            chatStatus === 'hidden'
              ? 'hidden'
              : chatStatus === 'open'
              ? 'animate-on-open-chat'
              : 'animate-on-close-chat'
          } h-screen w-screen max-w-full sm:max-w-md animate-red`}
          onAnimationEnd={() =>
            chatStatus === 'close' && setChatStatus('hidden')
          }
        >
          <Chat onClose={() => setChatStatus('close')} title="Meeting Chat" />
        </div>
      </div>

      <ToastContainer {...TOAST_PROPS} />
    </QoraContext.Provider>
  );

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        ?.getSenders()
        .find((s) => s.track?.kind === track.kind);

      sender?.replaceTrack(track);
    };
  }

  async function toggleVideo() {
    const currentVideoTrack = stream.getVideoTracks()[0];
    if (currentVideoTrack.readyState !== 'ended') {
      currentVideoTrack.stop();
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];

      Object.values(peers).forEach(replaceTrack(newVideoTrack));
      stream.removeTrack(currentVideoTrack);

      const [screenTrack] = stream.getVideoTracks();

      if (screenTrack) swapTracksOrder(newVideoTrack, screenTrack);
      else stream.addTrack(newVideoTrack);
    }

    function swapTracksOrder(
      track2: MediaStreamTrack,
      track1: MediaStreamTrack
    ) {
      stream.removeTrack(track1);
      stream.addTrack(track2);
      stream.addTrack(track1);
    }
  }
};

export default Room;
export type Kind = 'audio' | 'video' | 'chat' | 'fullscreen';
type Chat = 'hidden' | 'close' | 'open';
