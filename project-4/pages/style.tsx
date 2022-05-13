import tw from 'tailwind-styled-components';

export const Button = tw.button`
  w-full 
  flex 
  items-center 
  justify-center 
  px-5 
  py-2 
  border 
  border-transparent 
  text-base 
  font-medium 
  rounded-md 
  text-white 
  bg-indigo-600 
  hover:bg-indigo-700 
  md:py-4 
  md:text-lg 
  md:px-10
`;

export const JoinButton = tw.button`
  inline-flex 
  items-center 
  px-2.5 
  py-1.5 
  text-xs 
  font-medium 
  rounded 
  text-gray-700 
  bg-white 
  hover:bg-gray-50 
  focus:outline-none 
  focus:ring-2 
  focus:ring-offset-2 
  focus:ring-indigo-500
`;
