import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

type TSocket = Socket<DefaultEventsMap, DefaultEventsMap>;

const useSocket = () => {
  const [socket, setSocket] = useState<TSocket | undefined>(undefined);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [me, setMe] = useState('');
  const [call, setCall] = useState<any>(undefined);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer.Instance>();

  useEffect((): any => {
    (async () => {
      await fetch('/api/socket');

      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;

      const socketIO = io();

      socketIO.on('me', setMe);

      socketIO.on('calluser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivedCall: true, from, name: callerName, signal });
      });

      setSocket(socketIO);
    })();

    return () => socket?.disconnect();
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket?.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    if (connectionRef.current) connectionRef.current = peer;
  };

  const callUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket?.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket?.on('callaccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    if (connectionRef.current) connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current?.destroy();

    window.location.reload();
  };

  return {
    call,
    callAccepted,
    callEnded,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    me,
    callUser,
    answerCall,
    leaveCall,
  };
};

export default useSocket;
