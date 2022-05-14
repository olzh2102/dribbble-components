import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { JoinRoom, WelcomeContainer } from '../components';
import { useSocketContext } from '../hooks';
import { CameraIcon } from '../assets/icons';
import { Button, JoinButton } from './style';

const Home: NextPage = () => {
  const room = 'some-room-id';

  const { socket } = useSocketContext({ room });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (message) => {
      setMessage(message.msg);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const joinRoom = () => {
    console.log(message);
  };

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
        <JoinButton disabled={false} onClick={joinRoom}>
          Join
        </JoinButton>
      </div>
    </WelcomeContainer>
  );
};

export default Home;
