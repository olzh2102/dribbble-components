import { useEffect, useState } from 'react';
import { SpeakerIcon } from '../../assets/icons';

const ActiveSpeaker = ({ stream }: { stream: MediaStream }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
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
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
        }, 1000);
      }
    };
    update();
  }, []);

  return isSpeaking ? (
    <div className="animate-[wiggle_1s_ease-in-out_infinite] rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
      <SpeakerIcon />
    </div>
  ) : null;
};

export default ActiveSpeaker;
