import { useContext, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { QoraContext } from '@pages/qora/[qoraId]';
import { UserMessage } from '@common/types';
import { MYSELF } from '@common/constants';
import { append, formatTimeHHMM } from '@common/utils';
import { Message } from '..';
import { useUser } from '@auth0/nextjs-auth0';
import { SocketContext } from '@pages/_app';
import { UsersSettingsProvider } from 'contexts';
import { UsersStateContext } from 'contexts/users-settings';
import { UsersConnectionContext } from 'contexts/users-connection';

const Statuses = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  const { streams, isMuted, isHidden } = useContext(UsersStateContext);
  console.log('users: ', streams);
  const usersEntries = Object.entries(streams);

  return (
    <SidebarContainer onClose={onClose} title={title}>
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {usersEntries.map(([id]) => (
          <span>
            {id.slice(0, 5)}: {String(isMuted[id])} / {String(isHidden[id])}
          </span>
        ))}
      </div>
    </SidebarContainer>
  );
};

export default Statuses;

const SidebarContainer = ({ onClose, title, children }: any) => {
  return (
    <div className="h-full bg-[#1e262e] text-gray-300 shadow-xl rounded-l-3xl">
      <div className="flex flex-col pl-6 py-6 h-full justify-between">
        <div className="flex justify-between mr-6 mb-3">
          <h2 className="text-lg font-medium text-gray-300">{title}</h2>
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={onClose}
          >
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
