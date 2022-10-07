import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream, KeyValue } from '@common/types';
import { append } from '@common/utils';
import { UserUpdaterContext } from '@app/*';

/**
 * Actor - user that just joined the room
 * Answers a call from who is already in the room
 *
 * @param cb - appends stream of user in the rrom
 *
 * @param setIsMuted - answerer receives "isMuted" param from calling user and records it into dictionary into his/her id.
 * Note: id is also coming to the receiver aloing with his/her stream and name, id
 */

const usePeerOnAnswer = (cb: AppendVideoStream) => {
  const { peer, setPeers, stream } = useContext(QoraContext);
  const { setIsMuted, setIsHidden, setAvatar } = useContext(UserUpdaterContext);

  useEffect(() => {
    if (!peer) return;

    peer.on('call', (call: any) => {
      const { peer, metadata } = call;
      const { user, mediaSetup } = metadata;

      setPeers(append({ [peer]: call }));
      setIsMuted(append({ [peer]: mediaSetup.isMuted }));
      setIsHidden(append({ [peer]: mediaSetup.isHidden }));
      setAvatar(append({ [peer]: user.picture }));

      call.answer(stream); // * answers incoming call with his/her stream

      console.table({
        'answer-friend': 'answer friend',
        'user-id': peer,
        'user-name': user.name,
      });

      call.on('stream', cb({ id: peer, name: user.name })); // * receiver's stream

      call.on('close', () => toast(`${user.name} has left the room`));
    });
  }, [peer]);
};

export default usePeerOnAnswer;
