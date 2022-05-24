import { useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { JoinRoom, WelcomeContainer } from '../components';
import { Button, JoinButton } from './style';

const Home: NextPage = () => {
  const [inputVal, setInputVal] = useState('');

  return (
    <WelcomeContainer>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <Link href={`/room/${uuid()}`}>
          <Button>New room</Button>
        </Link>

        <Link href={`/chamber/${uuid()}`}>
          <button className="rounded bg-[#881337] text-white px-2 mr-3">
            New chamber
          </button>
        </Link>

        <JoinRoom setInputVal={setInputVal} />
        <Link href={`${inputVal == '' ? '/' : `/chamber/${inputVal}`}`}>
          <JoinButton disabled={inputVal == ''}>Join</JoinButton>
        </Link>
      </div>
    </WelcomeContainer>
  );
};

export default Home;
