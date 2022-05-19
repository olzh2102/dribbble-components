import { useEffect, useState, useRef } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useSocketContext } from '../../hooks';

const Chamber: NextPage = () => {
  const router = useRouter();

  const { chamberId } = router.query as { chamberId: string };
  const { socket } = useSocketContext({ roomId: chamberId });

  const videoRefFirst = useRef<HTMLVideoElement>(null);
  const videoRefSecond = useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!socket || !localStream) return;

    socket.emit('join-room', { roomId: chamberId, userId: 'user-1' });

    socket.on('member-joined', async (userId) => {
      await createOffer(userId);
      console.log('A new user joined the chamber: ', userId);
    });

    socket.on('message-from-peer', async ({ text, userId }) => {
      const message = JSON.parse(text);
      if (message.type === 'offer') {
        await createAnswer(userId, message.offer);
      }

      if (message.type === 'answer') {
        await addAnswer(message.answer);
      }

      if (message.type === 'candidate') {
        if (peerConnection) {
          peerConnection.addIceCandidate(message.candidate);
        }
      }
      console.log(message.type, message);
    });
  }, [socket, localStream]);

  useEffect(() => {
    init();
    async function init() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);

      if (stream && videoRefFirst.current)
        videoRefFirst.current.srcObject = stream;
    }
  }, []);

  async function createPeerConnection(userId: string) {
    const peerConnection = new RTCPeerConnection();
    const remoteStream = new MediaStream();
    console.log('REMOTE STREAM: ', remoteStream);

    if (videoRefSecond.current) videoRefSecond.current.srcObject = remoteStream;

    if (localStream)
      for (const track of localStream.getTracks())
        peerConnection.addTrack(track, localStream);

    peerConnection.ontrack = (event: any) => {
      for (const track of event.streams[0].getTracks())
        remoteStream.addTrack(track);
    };

    peerConnection.onicecandidate = async (event: any) => {
      if (event.candidate && socket) {
        socket.emit('send-message', {
          text: JSON.stringify({
            type: 'candidate',
            candidate: event.candidate,
          }),
          userId,
        });
      }
    };

    return peerConnection;
  }

  async function createOffer(userId: string) {
    const peerConnection = await createPeerConnection(userId);
    setPeerConnection(peerConnection);

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log('OFFER: ', offer);

    if (socket) {
      socket.emit('send-message', {
        text: JSON.stringify({ type: 'offer', offer }),
        userId,
      });
    }
  }

  async function createAnswer(
    userId: string,
    offer: RTCSessionDescriptionInit
  ) {
    const peerConnection = await createPeerConnection(userId);
    setPeerConnection(peerConnection);

    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    if (socket) {
      socket.emit('send-message', {
        text: JSON.stringify({ type: 'answer', answer }),
        userId,
      });
    }
  }

  async function addAnswer(answer: RTCSessionDescriptionInit) {
    if (peerConnection && !peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 place-content-center">
      <video
        className="bg-slate-800 w-auto h-72 m-5 rounded-2xl"
        ref={videoRefFirst}
        autoPlay
        playsInline
        muted
      />

      <video
        className="bg-slate-800 w-auto h-72 m-5 rounded-2xl"
        ref={videoRefSecond}
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default Chamber;
