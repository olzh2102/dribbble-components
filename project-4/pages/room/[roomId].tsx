import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@auth0/nextjs-auth0';

const BASE_URL = '/';

const Room: NextPage = () => {
  const { user } = useUser();
  console.log('user: ', user);

  const router = useRouter();
  const { roomId } = router.query;
  console.log('room id: ', roomId);

  const [socket, setSocket] = useState<Socket>();
  console.log('SOCKET: ', socket);

  useEffect(() => {
    const s = io('/', { path: '/api/socketio' });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join-room', roomId, user?.sub);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('user-connected', (userId) => {
      console.log('user connected: ', userId);
    });
  }, [socket]);

  console.log('SOCKET: ', socket);

  return (
    <div>
      <Head>
        <title>room</title>
        <meta name="description" content="Video Chat App" />
      </Head>
      <main>video room goes here</main>
    </div>
  );
};

export default Room;
