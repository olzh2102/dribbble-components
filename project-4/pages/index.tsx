import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { customAlphabet } from 'nanoid';

import { ROOM_NAME } from 'common/constants';

import { Header, WelcomeContainer } from '../components';

const nanoId = customAlphabet('abcdefghijklmnopqrstuvxyz', 10);

const Home: NextPage = () => {
  const router = useRouter();
  const roomId = nanoId();
  const [value, setValue] = useState('');

  return (
    <>
      <Header />
      <WelcomeContainer>
        <button
          onClick={() => {
            window.localStorage.setItem(roomId, '*');
            router.push(`/qora/${roomId}`);
          }}
          className={`
              px-6 py-2 
              inline-flex 
              items-center 
              bg-emerald-300 
              hover:bg-indigo-200 
              border border-transparent rounded-md 
              text-sm font-medium text-emerald-800 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              focus:ring-indigo-500
            `}
        >
          Jańa qora
        </button>

        <input
          type="text"
          name="email"
          id="email"
          onChange={(e: any) => setValue(e.target.value)}
          className={`
            rounded
            focus:outline-none 
            focus:ring 
            px-3 w-80 
            focus:border-emerald-500 
          `}
          placeholder="room id"
        />

        <button
          onClick={() =>
            value.length > 0
              ? router.push(`/${ROOM_NAME}/${value}`)
              : router.push('/')
          }
          className={`
            inline-flex 
            items-center 
            px-6 py-2 
            border border-transparent rounded-md 
            text-sm font-medium text-sky-100 
            bg-blue-500 
            hover:bg-blue-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-indigo-500
          `}
        >
          Join{' '}
        </button>
      </WelcomeContainer>
    </>
  );
};

export default Home;
