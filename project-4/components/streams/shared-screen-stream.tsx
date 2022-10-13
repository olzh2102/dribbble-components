import { useContext } from 'react';

import { UsersStateContext } from 'contexts/users-settings';

import SharedScreen from '@components/shared-screen';
import { Nullable } from '@common/types';

export default function SharedScreenStream({
  myScreenTrack,
}: {
  myScreenTrack: Nullable<MediaStreamTrack>;
}) {
  const { sharedScreenTrack } = useContext(UsersStateContext);
  const screenTrack = myScreenTrack ?? sharedScreenTrack;

  return screenTrack ? <SharedScreen sharedScreenTrack={screenTrack} /> : null;
}
