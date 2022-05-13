import type { NextPage } from 'next';
import Link from 'next/link';

import { JoinRoom, WelcomeContainer } from '../components';
import { CameraIcon } from '../assets/icons';
import { Button, JoinButton } from './style';

const Home: NextPage = () => {
  return (
    <WelcomeContainer>
      <div className="mt-5 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md mr-3">
          <Link href="/dasdasddasd">
            <Button>
              <CameraIcon />
              Create room
            </Button>
          </Link>
        </div>
        <JoinRoom />
        <JoinButton disabled={true}>Join</JoinButton>
      </div>
    </WelcomeContainer>
  );
};

export default Home;
