import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream, KeyValue, MediaSetup } from '@common/types';
import { append, syncSession } from '@common/utils';
import { useUser } from '@auth0/nextjs-auth0';
import { useMediaStream } from '.';
import { SocketContext } from '@pages/_app';
import useSessionStorage from './use-session-storage';

/**
 * Actor - user that is in the room already.
 * Listens whether an user joined the room
 *
 * 1. Makes a call to the joined user's id with his/her stream, name and isMuted
 * 2. Receiver adds a stream, name, and id of joined user
 *
 * @param appendStream - appends upcoming stream
 */

const useUserJoin = (appendStream: AppendVideoStream) => {
  const socket = useContext(SocketContext);
  const { name: n, picture: p } = useUser().user!;
  const { peer, setPeers, stream } = useContext(QoraContext);
  const { muted: amIMuted, visible: amIVisible } = useMediaStream({ stream });

  useEffect(() => {
    socket.on('user:joined', ({ id, name, avatar, muted, visible }: any) => {
      console.table({
        'call-friend': 'call friend',
        'user-id': id,
        'user-name': name,
        muted: muted,
        visible: visible,
      });

      const call = peer.call(
        id,
        stream, // my stream
        {
          metadata: {
            user: { name: n, avatar: p, muted: amIMuted, visible: amIVisible },
          },
        }
      );

      call.on('stream', appendStream({ id, name })); // * friend's stream
      call.on('close', () => toast(`${name} has left the room`));

      setPeers(append({ [id]: call }));
      syncSession().persist(id, { name, avatar, muted, visible });
    });

    return () => {
      socket.off('user:joined');
    };
  }, []);
};

export default useUserJoin;
