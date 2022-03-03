import { createContext } from 'react';
import { Position } from '../types';

export const SetBoxPositionContext = createContext({
  position: 'top' as Position,
  setPosition: (position: Position) => {},
});

const useSetBoxPosition = () => {};

export default useSetBoxPosition;
