import { useState, useEffect } from 'react';

const useIsAudioActive = ({ stream, fftSize = 1024 }: any) => {
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
  }, [stream]);

  return isSpeaking;
};

export default useIsAudioActive;
