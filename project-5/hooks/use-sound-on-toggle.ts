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
    setPlayOff(new Audio(pathOff));
    setPlayOn(new Audio(pathOn));
  }, []);

  return {
    playOff: playOff?.play.bind(playOff)!,
    playOn: playOn?.play.bind(playOn)!,
  };
}
