import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { io, Socket } from 'socket.io-client';

const BASE_URL = '/';

const Home: NextPage = () => {
  const [socket, setSocket] = useState<Socket>();
  console.log('SOCKET: ', socket);

  useEffect(() => {
    const s = io(BASE_URL, { path: '/api/socketio' });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  console.log('SOCKET: ', socket);

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
