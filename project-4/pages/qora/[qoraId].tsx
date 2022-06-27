import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { SpeakerIcon, UserIcon } from '../../assets/icons';
import { ControlPanel } from '../../components';

import {
  useCreateVideoStream,
  useCreatePeer,
  useOnOpenPeer,
  usePeerOnJoinRoom,
  usePeerOnAnswer,
  useCreateVideoOnPageOpen,
  usePeerOnLeftRoom,
  useAddVideoStream,
  useGetRoomId,
} from '../../hooks';

const DEFAULT_CONSTRAINTS = {
  video: true,
  audio: true,
};

const Qora: NextPage = () => {
  const router = useRouter();

  const roomId = useGetRoomId();

  const [amIHost, setAmIHost] = useState(false);

  useEffect(() => {
    setAmIHost(!!window.localStorage.getItem(roomId));
  }, [roomId]);

  const [videoRefs, setVideoRefs] = useState<VideoRefsType>({});
  const [videos, setVideos] = useState<Record<string, JSX.Element>>({});
  const [whoIsSpeaking, setWhoIsSpeaking] = useState<boolean[]>([]);

  const [peers, setPeers] = useState<Record<string, any>>({});
  const { peer } = useCreatePeer();

  const { me } = useOnOpenPeer({ peer });

  const { stream } = useCreateVideoStream(DEFAULT_CONSTRAINTS);

  const handleWhoIsSpeaking = useCallback(
    (stream: MediaStream, index: number) => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 1024;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const update = () => {
        requestAnimationFrame(update);
        analyser.getByteTimeDomainData(dataArray);
        let values = 0;
        for (let i = 0; i < dataArray.length; i++) {
          values += dataArray[i];
        }
        if (values / dataArray.length / 128 >= 1) {
          const copy = [...whoIsSpeaking];
          copy[index] = true;
          setWhoIsSpeaking(copy);
          setTimeout(() => {
            copy[index] = false;
            setWhoIsSpeaking(copy);
            setWhoIsSpeaking(copy);
          }, 1000);
        }
      };
      update();
    },
    []
  );

  useEffect(() => {
    const streams: MediaStream[] = Object.values(videoRefs).map(
      (videoRef: any) => videoRef.children[0].srcObject
    );

    if (streams.length) streams.forEach(handleWhoIsSpeaking);
  }, [videoRefs]);

  const addVideoStream = useAddVideoStream({
    setVideos,
    setVideoRefs,
  });

  useCreateVideoOnPageOpen({ stream, id: me, addVideoStream });

  usePeerOnJoinRoom({ peer, stream, addVideoStream, setPeers });
  usePeerOnAnswer({ peer, stream, addVideoStream, setPeers });

  usePeerOnLeftRoom({ peers, videoRefs });

  function toggle(type: 'audio' | 'video', peerId = me) {
    const stream: any = (videoRefs[peerId].children[0] as HTMLVideoElement)
      .srcObject;

    const tracks =
      type === 'video' ? stream.getTracks() : stream.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    if (track.enabled) track.enabled = false;
    else track.enabled = true;
  }

  return (
    <div className="grid h-screen place-items-center place-content-center">
      {!peer || !stream ? (
        <>
          <span className="animate-ping absolute inline-flex h-32 w-32 rounded-full bg-gray-400 opacity-75 -z-10" />
          <UserIcon className="h-48 w-48" />
        </>
      ) : (
        <>
          <h2 className="mb-8 font-semibold">Meeting topic: something</h2>
          <div className="flex w-full flex-wrap gap-4 justify-center">
            {Object.entries(videos).map(([peerId, element], index) => {
              return (
                <div key={peerId} className="relative">
                  {element}
                  {whoIsSpeaking[index] && (
                    <div className="animate-[wiggle_1s_ease-in-out_infinite] rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
                      <SpeakerIcon />
                    </div>
                  )}
                  {amIHost && (
                    <>
                      <ControlPanel
                        onAudio={() => toggle('audio', peerId)}
                        onHangUp={() => {
                          peers[peerId]?.close();
                          videoRefs[peerId]?.remove();
                        }}
                        constraints={DEFAULT_CONSTRAINTS}
                      />
                      <div>I am THE host</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <ControlPanel
            onVideo={() => toggle('video')}
            onAudio={() => toggle('audio')}
            onHangUp={() => router.push('/')}
            constraints={DEFAULT_CONSTRAINTS}
          />
        </>
      )}
    </div>
  );
};

export default Qora;

type VideoRefsType = Record<string, HTMLDivElement>;
