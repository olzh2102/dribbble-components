import React from 'react';

const LineIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'rotate(90deg)' }}>
    <path
      fill={color}
      d="M21.71,3.29a1,1,0,0,0-1.42,0l-18,18a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l18-18A1,1,0,0,0,21.71,3.29Z"
    />
  </svg>
);

export default LineIcon;
