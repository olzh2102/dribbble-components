import { useEffect, useState } from "react";

export default function useSoundOnToggle({
  pathOn,
  pathOff,
}: {
  pathOn: string;
  pathOff: string;
}) {
  const [playOn, setPlayOn] = useState<HTMLAudioElement | null>(null);
  const [playOff, setPlayOff] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const pathOffAudio = new Audio(pathOff);
    pathOffAudio.volume = 0.2;
    setPlayOff(pathOffAudio);
    const pathOnAudio = new Audio(pathOn);
    pathOnAudio.volume = 0.2;
    setPlayOn(pathOnAudio);
  }, []);

  return {
    playOff: playOff?.play.bind(playOff)!,
    playOn: playOn?.play.bind(playOn)!,
  };
}
