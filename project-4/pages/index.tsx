import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { Header, WelcomeContainer } from '../components';

const Home: NextPage = () => {
  const [value, setValue] = useState('');

  const roomId = uuid();

  return (
    <>
      <Header />
      <WelcomeContainer>
        <div className="flex gap-4 justify-start mt-4">
          <Link href={`/bølme/${roomId}`}>
            <button
              onClick={() => window.localStorage.setItem(roomId, '*')}
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New room
            </button>
          </Link>

          <Link href={`/qora/${roomId}`}>
            <button
              onClick={() => window.localStorage.setItem(roomId, '*')}
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Jańa qora
            </button>
          </Link>

          <Link href={`/space/${roomId}`}>
            <button
              onClick={() => window.localStorage.setItem(roomId, '*')}
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Jańa space
            </button>
          </Link>

          <input
            type="text"
            name="email"
            id="email"
            onChange={(e: any) => setValue(e.target.value)}
            className="focus:outline-none focus:ring px-3 focus:border-emerald-500 w-80 rounded"
            placeholder="room id"
          />

          <Link href={value.length > 0 ? `/qora/${value}` : '/'}>
            <button
              onClick={() => window.localStorage.setItem(roomId, '*')}
              type="button"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-sky-100 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join{' '}
            </button>
          </Link>
        </div>
      </WelcomeContainer>
    </>
  );
};

export default Home;
