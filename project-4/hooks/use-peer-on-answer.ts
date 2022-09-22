import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream, KeyValue } from '@common/types';
import { append } from '@common/utils';

/**
 * Actor - user that just joined the room
 * Answers a call from who is already in the room
 *
 * @param cb - appends stream of user in the rrom
 *
 * @param setIsMuted - answerer receives "isMuted" param from calling user and records it into dictionary into his/her id.
 * Note: id is also coming to the receiver aloing with his/her stream and name, id
 */

const usePeerOnAnswer = (
  cb: AppendVideoStream,
  setIsMuted: Dispatch<SetStateAction<KeyValue<boolean>>>,
  setIsHidden: Dispatch<SetStateAction<KeyValue<boolean>>>
) => {
  const { peer, setPeers, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!peer) return;

    peer.on('call', (call: any) => {
      const { peer, metadata } = call;
      const { username, mediaSetup } = metadata;

      setPeers(append({ [peer]: call }));
      setIsMuted(append({ [peer]: mediaSetup.isMuted }));
      setIsHidden(append({ [peer]: mediaSetup.isHidden }));

      call.answer(stream); // * answers incoming call with his/her stream

      console.table({
        'answer-friend': 'answer friend',
        'user-id': peer,
        'user-name': username,
      });

      call.on('stream', cb({ id: peer, name: username })); // * receiver's stream

      call.on('close', () => toast(`${username} has left the room`));
    });
  }, [peer]);
};

export default usePeerOnAnswer;
