import { ToastContainerProps } from 'react-toastify';

export const ROOM_NAME = 'qora';
export const WINDOW_SIZE_IN_SAMPLES = 1024;
export const MYSELF = 'You';
export const SOCKET_PATH = '/api/socketio';
export const TOAST_PROPS: ToastContainerProps = {
  position: 'bottom-left',
  theme: 'dark',
  autoClose: 3000,
};
export const FAILURE_MSG = 'Oooops!!! Failed. Try again later 🫠';
export const PEER_LOADING_MSG = 'Setting you up... 🎮';
export const STREAM_LOADING_MSG =
  'Hold on. Getting your video stream ready... 🚀';