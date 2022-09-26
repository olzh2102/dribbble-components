import { useEffect, useState } from 'react';
import { error } from '@common/utils';
import { Nullable } from '@common/types';

const useStream = ({
  audio = true,
  video = true,
  stream: s = null,
  muted: m = false,
  visible: v = true,
}: {
  audio?: boolean;
  video?: boolean;
  stream?: Nullable<MediaStream>;
  muted?: boolean;
  visible?: boolean;
} = {}) => {
  const [stream, setStream] = useState<Nullable<MediaStream>>(s);
  const [status, setStatus] = useState<'loading' | 'idle' | 'rejected' | 'success'>('loading');

  const [muted, setMuted] = useState(m);
  const [visible, setVisible] = useState(v);

  useEffect(() => {
    if (s) {
      setStatus('idle');

      const [audio, video] = s.getTracks();

      setMuted(!audio.enabled);
      setVisible(video.enabled);
    } else {
      (async function createStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio,
            video,
          });

          setStream(stream);
          setStatus('success');
        } catch (e) {
          setStatus('rejected');
          error('Access denied for audio and video stream')(e);
        }
      })();
    }
  }, []);

  function toggle(kind: 'audio' | 'video') {
    return (s = stream) => {
      const newLocal = 'Failed. Could not find stream';
      if (!s) throw new Error(newLocal);

      const track = s.getTracks().find((track) => track.kind == kind);

      if (!track) throw new Error(`Failed. Could not find ${kind} track in given stream`);

      if (track.enabled) {
        track.enabled = false;
        console.log(typeof track.kind);
        track.kind == 'audio' ? setMuted(true) : setVisible(false);
        console.log(muted);
      } else {
        track.enabled = true;
        console.log(track.kind);
        track.kind == 'audio' ? setMuted(false) : setVisible(true);
      }
    };
  }

  return {
    stream,
    muted,
    visible,
    mediaSetup: { muted, visible },
    toggle,
    toggleAudio: toggle('audio'),
    toggleVideo: toggle('video'),
    isLoading: status == 'loading',
    isError: status == 'rejected',
    isSuccess: status == 'success',
  };
};

export default useStream;
