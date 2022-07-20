import { MediaConnection } from 'peerjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MutedIcon } from '../assets/icons';
import { toggleAudio } from '../common/utils';
import { ControlPanel, HostControlPanel, PeerVideo } from '../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  usePeerOnLeftRoom,
  useGetRoomId,
} from '../hooks';
import { SocketContext } from '../pages/qora/[qoraId]';

const App = () => {
  console.log('render app');
  const roomId = useGetRoomId();
  const socket = useContext(SocketContext);
  const peer = useCreatePeer();

  const me = useOnOpenPeer(peer);
  const isHost =
    typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);

  const [videoRefs, setVideoRefs] = useState<KeyValue<HTMLDivElement>>({});
  const [videos, setVideos] = useState<KeyValue<JSX.Element>>({});
  const [peers, setPeers] = useState<KeyValue<MediaConnection>>({});
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});

  const stream = useCreateVideoStream({
    video: true,
    audio: true,
  });

  useEffect(() => {
    if (!stream) return;
    me && addVideoStream({ id: me, stream, isMe: true });
  }, [me]);

  useEffect(() => {
    socket.on(
      'member-muted',
      ({ userId, username }: { userId: string; username: string }) => {
        if (!videoRefs[userId]) return;
        const stream: any = (videoRefs[userId].children[0] as HTMLVideoElement)
          .srcObject;
        toggleAudio(stream);
        setIsMuted((prev) => ({ ...prev, [userId]: true }));
        toast(`${username} is muted`);
      }
    );

    socket.on('audio-status-toggled', (peerId) => {
      setIsMuted((prev) => ({ ...prev, [peerId]: !prev[peerId] }));
    });

    return () => {
      socket.off('member-muted');
      socket.off('audio-status-toggled');
    };
  }, [videoRefs]);

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });
  usePeerOnLeftRoom({ peers, videoRefs });

  function handleMutePeer(id: string, name: string) {
    socket.emit('mute-peer', {
      userId: id,
      username: name,
    });
    setIsMuted((prev) => ({ ...prev, [id]: true }));
  }

  function handleRemovePeer(id: string) {
    socket.emit('remove-peer', id);
    peers[id]?.close();
    videoRefs[id]?.remove();
  }

  function handleAudio() {
    socket.emit('toggle-audio-status', me);
    setIsMuted((prev) => ({ ...prev, [me]: !prev[me] }));
    if (stream) toggleAudio(stream);
  }

  function addVideoStream({
    id,
    name,
    stream,
    isMe,
  }: {
    id: string;
    name?: string;
    stream: MediaStream;
    isMe?: boolean;
  }) {
    setVideos((prev) => ({
      ...prev,
      [id]: (
        <div
          key={id}
          ref={(node) =>
            node && setVideoRefs((prev) => ({ ...prev, [id]: node }))
          }
          className="drop-shadow-2xl shadow-indigo-500/50"
        >
          <PeerVideo isMe={isMe} stream={stream} name={name} />
        </div>
      ),
    }));
    // const screenTrack = stream.getVideoTracks()[1];
    // if (screenTrack) {
    //   const s = new MediaStream([screenTrack]);
    //   setVideos((prev) => ({
    //     ...prev,
    //     [`${id}-screen`]: (
    //       <div
    //         key={id}
    //         ref={(node) =>
    //           node &&
    //           setVideoRefs((prev) => ({ ...prev, [`${id}-screen`]: node }))
    //         }
    //         className="drop-shadow-2xl shadow-indigo-500/50"
    //       >
    //         <PeerVideo isMe={isMe} stream={s} name={name} />
    //       </div>
    //     ),
    //   }));
    // }
  }

  const screenVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!peer) return;

    socket.on('screen-shared', (userId) => {
      peer.on('call', (call) => {
        call.answer(stream);

        call.on('stream', (stream) => {
          console.log('CALL STREAM:', stream);
        });
      });

      const stream: any = (videoRefs[userId].children[0] as HTMLVideoElement)
        .srcObject;
      const screenTrack = stream?.getVideoTracks()[1];
      console.log('SHARED STREAM:', stream);
      console.log('SHARED TRACK:', stream.getVideoTracks());
      if (screenTrack && screenVideoRef.current) {
        screenVideoRef.current.srcObject = new MediaStream([screenTrack]);
      }
    });

    return () => {
      socket.off('screen-shared');
    };
  }, [peer, videoRefs]);

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        .getSenders()
        .find((s) => s.track?.kind === track.kind);

      console.log('found sender:', sender);
      sender?.replaceTrack(track);
    };
  }

  Object.entries(videoRefs).forEach(([key, video]) => {
    const stream: any = (video.children[0] as HTMLVideoElement).srcObject;
    console.log('VIDEO TRACKS:', key, stream.getVideoTracks());
  });

  function stopShareScreen(screenTrack: MediaStreamTrack) {
    const streamTrack = stream?.getVideoTracks()[0];
    if (!streamTrack) return;
    stream?.removeTrack(screenTrack);

    Object.values(peers).forEach(replaceTrack(streamTrack));
  }

  async function handleShareScreen() {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    const screenTrack = screenStream.getTracks()[0];
    stream?.addTrack(screenTrack);

    // peer.dis();
    if (peer && stream) {
      peer.call(me, stream, {
        metadata: { username: 'Baigus' },
      });
    }

    if (screenVideoRef.current) screenVideoRef.current.srcObject = screenStream;

    socket.emit('share-my-screen', { username: me });
    // addVideoStream({ id: 'me', stream: screenStream });

    Object.values(peers).forEach(replaceTrack(screenTrack));

    screenTrack.onended = () => stopShareScreen(screenTrack);
    // senders.current.find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);
    // screenTrack.onended = function() {
    //     senders.current.find(sender => sender.track.kind === "video").replaceTrack(userStream.current.getTracks()[1]);
    // }
    // });

    /* 
      let screenShare = document.getElementById('shareScreen');
    screenShare.addEventListener('click', async () => {
        captureStream = await navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: { mediaSource: "screen" }
        });
        //Instead of adminId, pass peerId who will taking captureStream in call
        myPeer.call(adminId, captureStream);
    })

    screenShare = stream
                    let video = document.getElementById("local-video");
                    video.srcObject = stream;
                    video.play()
      */
  }

  return (
    <>
      {!peer || !stream ? (
        <div
          className="spinner-grow inline-block w-12 h-12 bg-white rounded-full opacity-0"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="flex w-full flex-wrap gap-4 justify-center">
            {Object.entries(videos).map(([id, element]) => (
              <div key={id} className="relative group">
                {element}

                {isHost && me !== id && (
                  <HostControlPanel
                    onRemovePeer={() => handleRemovePeer(id)}
                    onMutePeer={() =>
                      handleMutePeer(id, element.props.children.props.name)
                    }
                    isMuted={isMuted[id]}
                  />
                )}

                {isMuted[id] && (
                  <div className="absolute top-3 right-3">
                    <MutedIcon />
                  </div>
                )}
              </div>
            ))}
          </div>

          <ControlPanel
            isMuted={isMuted[me]}
            stream={stream}
            onAudio={handleAudio}
            onShareScreen={handleShareScreen}
            constraints={{
              video: true,
              audio: true,
            }}
          />
          <video
            className="rounded-[40px] w-96 h-72 object-cover"
            ref={screenVideoRef}
            autoPlay
            muted
          />
        </>
      )}
    </>
  );
};

export default App;

export type KeyValue<T> = Record<string, T>;
