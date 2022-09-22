import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { QoraContext } from '@pages/qora/[qoraId]';
import { AppendVideoStream, KeyValue } from '@common/types';
import { append } from '@common/utils';
import { useUser } from '@auth0/nextjs-auth0';

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
  setIsMuted: Dispatch<SetStateAction<KeyValue<boolean>>>,
  setIsHidden: Dispatch<SetStateAction<KeyValue<boolean>>>,
  setUserPictures: Dispatch<SetStateAction<KeyValue<string>>>
) => {
  const user = useUser().user!;
  const { mediaSetup, socket, peer, setPeers, stream } =
    useContext(QoraContext);

  useEffect(() => {
    if (!peer) return;

    socket.on(
      'user:joined',
      ({ id, name, picture, initMediaSetup }: UserConfig) => {
        console.table({
          'call-friend': 'call friend',
          'user-id': id,
          'user-name': name,
          initMediaSetup,
        });

        const call = peer.call(
          id,
          stream, // my stream
          {
            metadata: {
              user: {
                name: user.name,
                picture: user.picture,
              },
              mediaSetup,
            },
          }
        );

        call.on('stream', cb({ id, name })); // * friend's stream
        call.on('close', () => toast(`${name} has left the room`));

        setPeers(append({ [id]: call }));
        setIsMuted(append({ [id]: initMediaSetup.isMuted }));
        setIsHidden(append({ [id]: initMediaSetup.isHidden }));
        setUserPictures(append({ [id]: picture }));
      }
    );

    return () => {
      socket.off('user:joined');
    };
  }, [mediaSetup, peer]);
};

export default usePeerOnJoinRoom;

type UserConfig = {
  id: string;
  initMediaSetup: { isMuted: boolean; isHidden: boolean };
  name: string;
  picture: string;
};
