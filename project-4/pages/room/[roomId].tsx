import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, useState } from 'react';

import {
  useSocketContext,
  useCreateVideoStream,
  useCreatePeer,
} from '../../hooks';

const Room: NextPage = () => {
  console.log('render');
  const [users, setUsers] = useState([]) as any;

  const router = useRouter();
  const peer = useCreatePeer();
  const stream = useCreateVideoStream({ audio: false, video: true });

  const { roomId } = router.query as { roomId: string };
  const { socket } = useSocketContext({ roomId });

  const videoRef = useRef<HTMLVideoElement>(null);

  if (stream && videoRef.current) videoRef.current.srcObject = stream;

  return (
    <>
      <h2>Room page</h2>
      <div className="flex h-screen">
        <div className="m-auto" id="video-grid">
          <video
            className="rounded-2xl max-w-md max-h-80"
            ref={videoRef}
            playsInline
            muted
            autoPlay
          />
        </div>
        {users.map((user: any) => (
          <span>Joined user: {user}</span>
        ))}
      </div>
    </>
  );
};

export default Room;
