import { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { v4 as uuid } from 'uuid';

import { Header, JoinRoom, WelcomeContainer } from '../components';
import { JoinButton } from '../components/style';

const Home: NextPage = () => {
  const [value, setValue] = useState('');
  console.log('user:', useUser());
  const user = useUser();

  const roomId = uuid();

  return (
    <>
      <Header />
      <WelcomeContainer>
        <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
          <Link href={`/qora/${roomId}`}>
            <button
              className="rounded border border-gray-300 text-white px-2 mr-3"
              onClick={() => window.localStorage.setItem(roomId, '*')}
            >
              Jańa qora
            </button>
          </Link>

          <JoinRoom setValue={setValue} />
          <Link href={value.length > 0 ? `/qora/${value}` : '/'}>
            <JoinButton>Join</JoinButton>
          </Link>
        </div>
      </WelcomeContainer>
    </>
  );
};

export default Home;
