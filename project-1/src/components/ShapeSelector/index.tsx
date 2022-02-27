import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';

import { Shapes } from '../../types';
import useOnClickOutside from '../../hooks/useOnOutsideClick';
import { LineIcon, ArrowIcon, SquareIcon, CircleIcon } from '../Icons';
import StyledShapeSelector from './style';
import { SetBoxPositionContext } from '../../hooks/useSetBoxPosition';
import { shapeSelectorPositionStyles as styles } from '../../constants';

const ShapeSelector = ({ color, shape, onChange }: Props) => {
  const ref = useRef<any>();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const { position } = useContext(SetBoxPositionContext);

  const handleChange = (shape: Shapes) => {
    onChange(shape);
    setOpen(false);
  };

  const shapes = {
    line: (
      <div className="shape" onClick={() => handleChange('line')}>
        <LineIcon color={color} />
      </div>
    ),
    arrow: (
      <div className="shape" onClick={() => handleChange('arrow')}>
        <ArrowIcon color={color} />
      </div>
    ),
    square: (
      <div className="shape" onClick={() => handleChange('square')}>
        <SquareIcon color={color} />
      </div>
    ),
    circle: (
      <div className="shape" onClick={() => handleChange('circle')}>
        <CircleIcon color={color} />
      </div>
    ),
  };

  return (
    <StyledShapeSelector state={styles[position]}>
      <div onClick={() => setOpen(!open)}>{shapes[shape]}</div>
      {open && (
        <motion.div
          ref={ref}
          className="shapes"
          initial={{
            x: styles[position].initialX,
            y: styles[position].initialY,
          }}
          animate={{
            x: styles[position].x,
            y: styles[position].y,
          }}
          transition={{ type: 'spring' }}
        >
          {Object.values(shapes).map((shape) => shape)}
        </motion.div>
      )}
    </StyledShapeSelector>
  );
};

export default ShapeSelector;

type Props = {
  color: string;
  shape: Shapes;
  onChange: (shape: Shapes) => void;
};
