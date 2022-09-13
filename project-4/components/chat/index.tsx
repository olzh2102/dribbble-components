import { useCallback, useContext, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { QoraContext } from '@pages/qora/[qoraId]';
import { Message } from '..';
import { UserMessage } from '@common/types';
import { MYSELF } from '@common/constants';

const Chat = ({ title, onClose }: { title: string; onClose: () => void }) => {
  const { socket, user } = useContext(QoraContext);

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    socket.on('chat:get', (message: UserMessage) => {
      setMessages((prev) => prev.concat(message));
    });

    return () => {
      socket.off('chat:get');
    };
  }, []);

  function postNewMessage(user: string, text: string) {
    const data = {
      user,
      text,
    };

    socket.emit('chat:post', data);
  }

  function handleSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const message = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter' && message) {
      postNewMessage(user.name, message);
      setMessages((prev) =>
        prev.concat({ user: MYSELF, text: message, time: Date.now() })
      );
      setText('');
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
      <div className="relative w-screen max-w-md">
        <div className="h-screen bg-[#1e262e] text-gray-300 shadow-xl rounded-l-3xl">
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
            <div className="overflow-y-auto h-[calc(100vh-8rem)]">
              {messages.map((message, index) => (
                <Message
                  key={`${message.time}-${index}`}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))}
            </div>
            <div className="flex items-center justify-center pr-6 gap-4">
              <input
                autoComplete="off"
                type="text"
                name="name"
                id="name"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleSendMessage}
                className="p-4 bg-transparent outline-none block w-full text-sm border border-gray-300/[.5] rounded-2xl"
                placeholder="Send a message to everyone"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
