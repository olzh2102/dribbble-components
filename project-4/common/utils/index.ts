import { KeyValue, RoomId } from '@common/types';
import { customAlphabet } from 'nanoid';

function toggle(type: 'audio' | 'video') {
  return (s: MediaStream) => {
    const tracks = type === 'video' ? s.getTracks() : s.getAudioTracks();
    const track = tracks.find((track: any) => track.kind == type);

    if (track) track.enabled = !track.enabled;
  };
}

export const toggleVideo = toggle('video');
export const toggleAudio = toggle('audio');

export function formatTimeHHMM(milliseconds: number) {
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function createRoomId(): RoomId {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvxyz', 10);
  return nanoid();
}

export function createHost(roomId: RoomId): void {
  window.localStorage.setItem(roomId, '*');
}

export function append<T>(appendant: any) {
  return (target: KeyValue<T> | T[]) => {
    if (target instanceof Array) return target.concat(appendant);

    return { ...target, ...appendant };
  };
}

export function error(message: string) {
  return (error: any) => {
    console.error(message);
    console.error(error);
  };
}

export function isHost(roomId: RoomId): boolean {
  return typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);
}
