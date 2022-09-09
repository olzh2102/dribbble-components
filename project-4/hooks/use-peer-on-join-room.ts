import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream, KeyValue } from '@common/types';
import { append } from '@common/utils';

/**
 * Actor - user that is in the room already.
 * Listens whether an user joined the room
 *
 * 1. Makes a call to the joined user's id with his/her stream, name and isMuted
 * 2. Receiver adds a stream, name, and id of joined user
 *
 * @param cb - appends upcoming stream
 *
 * @param isMuted - receiver tells to the joined user whether he/she is muted.
 * Note: that is for displaying mic icon on video
 *
 * @param setIsMuted - receiver receives "isMuted" param from joined user and records it into dictionary into his/her id.
 * Note: id is also coming to the receiver aloing with his/her stream and name
 */

const usePeerOnJoinRoom = (
  cb: AppendVideoStream,
  isMuted: boolean,
  setIsMuted: Dispatch<SetStateAction<KeyValue<boolean>>>
) => {
  const { socket, peer, setPeers, user: me, stream } = useContext(QoraContext);

  useEffect(() => {
    if (!peer) return;

    socket.on('user:joined', ({ id, name, muted }: UserConfig) => {
      console.table({
        'call-friend': 'call friend',
        'user-id': id,
        'user-name': name,
      });

      const call = peer.call(id, stream, {
        metadata: {
          username: me?.name,
          isMuted,
        },
      });

      call.on('stream', cb({ id, name })); // * friend's stream
      call.on('close', () => toast(`${name} has left the room`));

      setPeers(append({ [id]: call }));
      setIsMuted(append({ [id]: muted }));
    });

    return () => {
      socket.off('user:joined');
    };
  }, [isMuted, peer]);
};

export default usePeerOnJoinRoom;

type UserConfig = {
  id: string;
  name: string;
  muted: boolean;
};
