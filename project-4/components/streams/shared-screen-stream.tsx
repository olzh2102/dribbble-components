import { useContext } from 'react';

import { UsersStateContext } from 'contexts/users-settings';

import SharedScreen from '@components/shared-screen';

export default function SharedScreenStream() {
  const { sharedScreenTrack } = useContext(UsersStateContext);

  return sharedScreenTrack ? (
    <SharedScreen sharedScreenTrack={sharedScreenTrack} />
  ) : null;
}
