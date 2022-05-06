import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { io } from 'socket.io-client';
import SocketIOClient from 'socket.io-client';

const Home: NextPage = () => {
  const [socket, setSocket] = useState<any>();
  console.log('socket: ', socket);

  useEffect(() => {
    const socket = io('/', {
      path: '/api/socketio',
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.emit('join-room', 10, 13);
  }, [socket]);

  // useEffect(() => {
  //   const s = (SocketIOClient as any).connect('/', {
  //     path: '/api/socketio',
  //   });
  //   setSocket(s);

  //   if (s) return () => s.disconnect();
  // }, []);

  return (
    <div>
      <Head>
        <title>Video Chat</title>
        <meta name="description" content="Video Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-3xl font-bold underline">Video chat app</h2>
        <Link href="/api/auth/login">Login</Link>
      </main>
    </div>
  );
};

export default Home;
