import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Chat = ({
  setOpen,
  title,
  children,
}: {
  title: string;
  setOpen: (arg: boolean) => void;
  children: React.ReactNode;
}) => {
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
          <div className="mt-6 relative flex-1 px-4 sm:px-6">
            {/* Replace with your content */}
            {children}
            {/* /End replace */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
