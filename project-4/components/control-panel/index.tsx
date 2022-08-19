import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneMissedCallIcon as HangUpIcon,
  UploadIcon as ShareScreenIcon,
} from '@heroicons/react/solid';
import { toggleVideo } from 'common/utils';
import { QoraContext } from '@pages/qora/[qoraId]';
import { useScreenShare } from '@hooks/index';
import Peer, { MediaConnection } from 'peerjs';
import { KeyValue } from '@common/types';

const ControlPanel = ({
  onAudio,
  isMuted,
  addVideoStream,
}: {
  onAudio: () => void;
  isMuted: boolean;
  addVideoStream: ({
    id,
    name,
    stream,
  }: {
    id: string;
    name: string;
    stream: MediaStream;
  }) => void;
}) => {
  const router = useRouter();
  const { isHost, me, peers, stream, sharedScreenTrack } =
    useContext(QoraContext);
  const [videoActive, setVideoActive] = useState(true);

  console.log('BANANA:', stream.getTracks());

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        ?.getSenders()
        .find((s) => s.track?.kind === track.kind);

      console.log('found sender:', sender);
      sender?.replaceTrack(track);
    };
  }

  const handleVideo = async () => {
    setVideoActive(!videoActive);
    // toggleVideo(stream);

    const currentVideoTrack = stream.getVideoTracks()[0];

    if (currentVideoTrack) {
      currentVideoTrack.stop();
      stream.removeTrack(currentVideoTrack);
      addVideoStream({ id: me, name: 'You', stream });
    } else {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const videoTrack = videoStream.getVideoTracks()[0];
      Object.values(peers as KeyValue<MediaConnection>).forEach(
        replaceTrack(videoTrack)
      );
      stream.addTrack(videoTrack);
      addVideoStream({ id: me, name: 'You', stream });
    }
  };

  const { isMyScreenSharing, toggleScreenShare } = useScreenShare();

  return (
    <>
      <button
        onClick={handleVideo}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
      >
        <VideoCameraIcon className="h-6 w-6" />
        {!videoActive && (
          <>
            <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
            <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
          </>
        )}
      </button>
      <button
        onClick={onAudio}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-slate-800 hover:bg-indigo-700 relative"
      >
        <MicrophoneIcon className="h-6 w-6" />
        {isMuted && (
          <>
            <div className="bg-current absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 -rotate-45" />
            <div className="bg-slate-800 absolute w-2/3 h-0.5 left-1/2 -translate-x-1/2 translate-y-0.5 -rotate-45" />
          </>
        )}
      </button>
      <button
        onClick={() => router.push('/')}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-400"
      >
        <HangUpIcon className="h-6 w-6" />
      </button>
      <button
        onClick={toggleScreenShare}
        type="button"
        className={`inline-flex items-center p-3 border border-transparent rounded-xl shadow-sm text-white bg-${
          sharedScreenTrack ? 'indigo' : 'red'
        }-600 hover:bg-${sharedScreenTrack ? 'indigo' : 'red'}-400`}
        disabled={!isHost && (sharedScreenTrack as any) && !isMyScreenSharing}
      >
        <ShareScreenIcon className="h-6 w-6" />
      </button>
    </>
  );
};

export default ControlPanel;
