const CrossLineDiv = ({ pos = { top: 6, left: 0.5 } }) => (
  <div
    className={'bg-current absolute w-2/3 h-0.5 -translate-x-1/2 -rotate-45 '.concat(
      Object.entries(pos)
        .map(([pos, val]) => `${pos}-${val}`)
        .join(' ')
    )}
  />
);

export default CrossLineDiv;
