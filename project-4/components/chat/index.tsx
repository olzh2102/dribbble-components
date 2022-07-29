import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { QoraContext } from '@pages/qora/[qoraId]';

const Chat = ({
  setOpen,
  title,
}: {
  title: string;
  setOpen: (arg: boolean) => void;
}) => {
  const { socket, user } = useContext(QoraContext);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.on('chat:get', (message: any) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  async function postNewMessage(user: string, text: string) {
    const data = {
      user,
      text,
    };

    socket.emit('chat:post', data);
  }

  function handleChangeMessage(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const message = (e.target as HTMLInputElement).value;

    if (e.key === 'Enter' && message) {
      postNewMessage(user?.name || 'Bot', message);
      setMessages((prev) => [
        ...prev,
        { user: user?.name, text: message, time: Date.now() },
      ]);
      setMessage('');
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
      <div className="relative w-screen max-w-md">
        <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
          <button
            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close panel</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
          <div className="px-4 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          </div>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {title}
                    </Dialog.Title>
                    {messages.map((message) => (
                      <div key={message.time}>
                        <span>{message.user}</span>
                        <span>
                          {new Date(message.time).getHours()} :{' '}
                          {new Date(message.time).getMinutes()}
                        </span>
                        <span>{message.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="p-4 flex items-center justify-center bg-white inset-x-0 bottom-0 absolute">
                      <div className="w-full max-w-xs mx-auto">
                        <div className="mt-1">
                          <input
                            autoComplete="off"
                            type="text"
                            name="name"
                            id="name"
                            value={message}
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
            </Transition.Child>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
