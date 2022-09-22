import { useContext, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { QoraContext } from '@pages/qora/[qoraId]';
import { UserMessage } from '@common/types';
import { MYSELF } from '@common/constants';
import { append, formatTimeHHMM } from '@common/utils';
import { Message } from '..';
import { useUser } from '@auth0/nextjs-auth0';

const Chat = ({ title, onClose }: { title: string; onClose: () => void }) => {
  const username = useUser().user!.name;
  const socket = useContext(QoraContext).socket;

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    socket.on('chat:get', (message: UserMessage) =>
      setMessages(append(message))
    );

    return () => {
      socket.off('chat:get');
    };
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const messageText = (e.target as HTMLInputElement).value;
    const lastMessage = messages.at(-1);

    if (e.key === 'Enter' && messageText) {
      const timeHHMM = formatTimeHHMM(Date.now());
      const message = {
        user: username,
        text: messageText,
        time: timeHHMM,
        shouldAggregate:
          lastMessage?.user === MYSELF && lastMessage?.time === timeHHMM,
      };

      socket.emit('chat:post', message);
      setMessages(append({ ...message, user: MYSELF }));
      setText('');
    }
  }

  return (
    <SidebarContainer onClose={onClose} title={title}>
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {messages.map((message, index) => (
          <Message
            key={`${message.time}-${index}`}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}
      </div>
      <div className="flex items-center justify-center pr-6 pt-6 gap-4">
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessage}
          className="p-4 bg-transparent outline-none block w-full text-sm border border-gray-300/[.5] rounded-2xl"
          placeholder="Send a message to everyone"
        />
      </div>
    </SidebarContainer>
  );
};

export default Chat;

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
