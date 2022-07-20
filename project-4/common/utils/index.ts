function toggle(type: 'audio' | 'video') {
  return (s: MediaStream) => {
    const tracks = type === 'video' ? s.getTracks() : s.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    if (track) track.enabled = !track.enabled;
  };
}

export const toggleVideo = toggle('video');
export const toggleAudio = toggle('audio');
