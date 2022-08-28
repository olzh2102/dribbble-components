import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { customAlphabet } from 'nanoid';

import { ROOM_NAME } from 'common/constants';

import { Header, WelcomeContainer } from '../components';
import Button from '@common/components/button';

const nanoId = customAlphabet('abcdefghijklmnopqrstuvxyz', 10);

const Home: NextPage = () => {
  const router = useRouter();
  const roomId = nanoId();
  const [value, setValue] = useState('');

  function handleCreateJanaQora() {
    window.localStorage.setItem(roomId, '*');
    router.push(`/qora/${roomId}`);
  }

  function handleJoinQora() {
    value.length > 0 ? router.push(`/${ROOM_NAME}/${value}`) : router.push('/');
  }

  return (
    <>
      <Header />
      <WelcomeContainer>
        <Button
          label="Jańa qora"
          onClick={handleCreateJanaQora}
          classes={['text-emerald-800', 'hover:bg-indigo-200']}
        />

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

        <Button
          label="Join"
          onClick={handleJoinQora}
          classes={['text-sky-100', 'hover:bg-blue-700']}
        />
      </WelcomeContainer>
    </>
  );
};

export default Home;
