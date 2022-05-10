import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { io, Socket } from 'socket.io-client';
import { uuid } from 'uuidv4';

const BASE_URL = '/';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Central</title>
        <meta name="description" content="Video Chat App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className="text-3xl font-bold underline">Video chat app</h2>
        <Link href="/api/auth/login">Login</Link>
        <Link href={`/room/${uuid()}`}>Create Video Room</Link>
      </main>
    </div>
  );
};

export default Home;
