import { useState, useEffect } from 'react';

const useIsAudioActive = ({ stream, fftSize = 1024 }: UseIsAudioActive) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = new AnalyserNode(audioContext, { fftSize });

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    requestAnimationFrame(update);

    function update() {
      analyser.getByteTimeDomainData(dataArray);

      const sum = dataArray.reduce((a, b) => a + b, 0);

      if (sum / dataArray.length / 128.0 >= 1) {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 1000);
      }

      requestAnimationFrame(update);
    }

    return () => {
      setIsSpeaking(false);
    };
  }, [stream]);

  return isSpeaking;
};

export default useIsAudioActive;

type UseIsAudioActive = {
  stream: MediaStream | null;
  fftSize?: FftSize;
};

type FftSize =
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048
  | 4096
  | 8192
  | 16384
  | 32768;
