import React from 'react';
import { Status } from '@common/types';

export default function useStream(
  stream: MediaStream | null = null,
  muted: boolean = false,
  visible: boolean = true
) {
  const [state, setState] = React.useState<MediaStream | null>(stream);
  const [status, setStatus] = React.useState<Status>('loading');

  const [m, setM] = React.useState(muted);
  const [v, setV] = React.useState(visible);

  React.useEffect(() => {
    if (stream) {
      setStatus('idle');

      const [audio, video] = stream.getTracks();
      setM(!audio.enabled);
      setV(video.enabled);
    } else {
      (async function createStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: !muted,
            video: visible,
          });

          setState(stream);
          setStatus('success');
        } catch (error) {
          setStatus('rejected');
          console.error('Access denied for audio and video stream', error);
        }
      })();
    }
  }, []);

  function toggle(kind: 'audio' | 'video') {
    return (s = state) => {
      const newLocal = 'Failed. Could not find stream';
      if (!s) throw new Error(newLocal);

      console.log('stream: ', s);
      console.log('stream tracks: ', s.getTracks());

      const track = s.getTracks().find((track) => track.kind == kind);

      if (!track)
        throw new Error(`Failed. Could not find ${kind} track in given stream`);

      if (track.enabled) {
        track.enabled = false;
        track.kind == 'audio' ? setM(true) : setV(false);
      } else {
        track.enabled = true;
        track.kind == 'audio' ? setM(false) : setV(true);
      }
    };
  }

  return {
    stream: state,
    muted: m,
    visible: v,
    toggle,
    toggleAudio: toggle('audio'),
    toggleVideo: toggle('video'),
    isLoading: status == 'loading',
    isError: status == 'rejected',
    isSuccess: status == 'success' || status == 'idle',
  };
}
