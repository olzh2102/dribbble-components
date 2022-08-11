import { useContext, useEffect, useState } from 'react';

import { WINDOW_SIZE_IN_SAMPLES } from 'common/constants';
import { SpeakerIcon } from '../../assets/icons';
import { QoraContext } from '@pages/qora/[qoraId]';

const ActiveSpeaker = () => {
  const { stream } = useContext(QoraContext);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    console.log('audio context:', source);
    source.connect(analyser);
    analyser.fftSize = WINDOW_SIZE_IN_SAMPLES;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const update = () => {
      requestAnimationFrame(update);
      analyser.getByteTimeDomainData(dataArray);
      let values = 0;
      for (let i = 0; i < dataArray.length; i++) {
        values += dataArray[i];
      }
      if (values / dataArray.length / 128 >= 1) {
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
        }, 1000);
      }
    };
    update();
  }, [stream]);

  return isSpeaking ? (
    <div className="animate-[wiggle_1s_ease-in-out_infinite] rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
      <SpeakerIcon />
    </div>
  ) : null;
};

export default ActiveSpeaker;
