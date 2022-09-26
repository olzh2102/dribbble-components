import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream } from '@common/types';
import { append, syncSession } from '@common/utils';

/**
 * Actor - user that just joined the room
 * Answers a call from who is already in the room
 *
 * @param appendStream - appends stream of user in the rrom
 */

export default function useUserAnswer(appendStream: AppendVideoStream) {
  const { peer, setPeers, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!peer) return;

    peer.on('call', (call: any) => {
      const { peer, metadata } = call;

      setPeers(append({ [peer]: call }));

      call.answer(stream); // * answers incoming call with his/her stream
      syncSession().persist(peer, metadata.user);

      console.table({
        'answer-friend': 'answer friend',
        'user-id': peer,
        user: metadata.user,
      });

      call.on('stream', appendStream({ id: peer, name: metadata.user.name })); // * receiver's stream
      call.on('close', () => toast(`${metadata.user.name} has left the room`));
    });
  }, [peer]);
}
