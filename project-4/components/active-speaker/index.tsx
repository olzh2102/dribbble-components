import React from 'react';

import { SpeakerIcon } from 'assets/icons';
import useIsAudioActive from '@hooks/use-is-audio-active';

const ActiveSpeaker = ({ stream }: { stream: MediaStream }) =>
  useIsAudioActive({ source: stream }) ? (
    <div className="rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
      <SpeakerIcon />
    </div>
  ) : null;

export default ActiveSpeaker;
