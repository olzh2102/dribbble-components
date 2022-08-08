import { useContext, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { QoraContext } from '@pages/qora/[qoraId]';
import { formatTimeHHMM } from 'common/utils';

const Chat = ({
  setOpen,
  title,
}: {
  title: string;
  setOpen: (arg: boolean) => void;
}) => {
  const { socket, user } = useContext(QoraContext);

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on('chat:get', (message: any) => {
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

  function handleChangeMessage(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const message = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter' && message) {
      postNewMessage(user?.name || 'Bot', message);
      setMessages((prev) =>
        prev.concat({ user: 'You', text: message, time: Date.now() })
      );
      setText('');
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
      <div className="relative w-screen max-w-md">
        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
          <button
            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => {
              console.log('tghfghdfghdfghdg');
              setOpen(false);
            }}
          >
            <span className="sr-only">Close panel</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="h-[calc(100vh-6rem)] flex flex-col py-6 bg-white shadow-xl">
          <div className="px-4 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          </div>
          <div className="relative w-screen max-w-md">
            <div className="flex flex-col py-6 bg-white shadow-xl">
              <div className="overflow-y-auto h-[calc(100vh-15rem)] pl-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.time}-${index}`}
                    className="my-4 font-mono text-xs"
                  >
                    <span className="font-bold mr-2">{message.user}</span>
                    <span className="text-slate-400">
                      {formatTimeHHMM(message.time)}
                    </span>
                    <span className="block mt-1">{message.text}</span>
                  </div>
                ))}
              </div>
              <div className="relative flex-1 px-4 sm:px-6">
                <div className="px-4 flex items-center justify-center bg-white inset-x-0">
                  <div className="w-full max-w-xs mx-auto">
                    <input
                      autoComplete="off"
                      type="text"
                      name="name"
                      id="name"
                      value={text}
                      onChange={handleChangeMessage}
                      onKeyDown={handleSendMessage}
                      className="p-4 bg-gray-200 outline-none block w-full sm:text-sm border-gray-300 px-4 rounded-full"
                      placeholder="Send a message to everyone"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
