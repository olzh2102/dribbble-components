import { useContext } from 'react';
import { RoomContext, SocketContext } from '../pages/bolme/[bolmeId]';

const Bolme = () => {
  const { ws } = useContext(SocketContext);
  const room = useContext(RoomContext);
  console.log('room data: ', room);
  // ws.emit('join-room', {userId, userName roomId})

  return (
    <>
      <div className="flex gap-4 items-start w-full">
        {/* shared screen */}
        <div className="flex justify-center basis-5/6"></div>

        {/* peers and host videos */}
        <div
          className={`flex flex-wrap gap-4 justify-around ${
            false ? 'basis-1/6' : ''
          }`}
        ></div>
      </div>

      {/* control panel */}
      <div className="flex gap-6 mt-6 place-content-center"></div>
    </>
  );
};

export default Bolme;
