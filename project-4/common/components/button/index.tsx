import { Nullable } from '@common/types';
import React from 'react';

const Button = ({
  rightIcon = null,
  leftIcon = null,
  iconButton = null,
  classes = [],
  label = '',
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
                px-6 py-2 
                inline-flex 
                items-center 
                bg-emerald-300 
                hover:bg-indigo-200 
                border border-transparent rounded-md 
                text-sm font-medium text-emerald-800 
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-indigo-500
                `.concat(classes.join(' '))}
    >
      {label}
    </button>
  );
};

export default Button;

type ButtonProps = {
  rightIcon?: Nullable<React.ReactNode>;
  leftIcon?: Nullable<React.ReactNode>;
  iconButton?: Nullable<React.ReactNode>;
  classes: string[];
  label?: string;
  onClick: () => any;
};
