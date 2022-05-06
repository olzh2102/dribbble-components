import type { NextPage } from 'next';
import { useState } from 'react';
import useSocket from '../../hooks/use-socket';

const VideoChat: NextPage = () => {
  const {
    answerCall,
    call,
    myVideo,
    userVideo,
    stream,
    callAccepted,
    callEnded,
    callUser,
    leaveCall,
    me,
  } = useSocket();
  const [idToCall, setIdToCall] = useState('');

  return (
    <>
      {stream && (
        <div>
          <video ref={myVideo} playsInline muted autoPlay />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div>
          <video ref={userVideo} playsInline muted autoPlay />
        </div>
      )}
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Account Info: {me}</p>
          <p>Make a call</p>
          <input
            placeholder="id to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          {callAccepted && !callEnded ? (
            <button
              onClick={leaveCall}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Hang up
            </button>
          ) : (
            <button
              onClick={() => callUser(idToCall)}
              style={{ backgroundColor: 'blue', color: 'white' }}
            >
              Call
            </button>
          )}
          {call?.isReceivedCall && !callAccepted && (
            <div>
              <h1>{call.name} is calling</h1>
              <button
                onClick={answerCall}
                style={{ backgroundColor: 'green', color: 'white' }}
              >
                Answer
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default VideoChat;
