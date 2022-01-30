import React from 'react';

const ArrowIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)">
    <path
      clipRule="evenodd"
      d="M26.704,20.393  c-0.394-0.39-1.034-0.391-1.428,0l-8.275,8.193V1c0-0.552-0.452-1-1.01-1s-1.01,0.448-1.01,1v27.586l-8.275-8.192  c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l9.999,9.899c0.39,0.386,1.039,0.386,1.429,0l9.999-9.899  C27.099,21.417,27.099,20.784,26.704,20.393C26.31,20.003,27.099,20.784,26.704,20.393z"
      fill={color}
      fillRule="evenodd"
    />
  </svg>
);

export default ArrowIcon;
