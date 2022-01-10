import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Shapes } from '../../types';
import { LineIcon, ArrowIcon, SquareIcon, CircleIcon } from '../Icons';
import StyledShapeSelector from './style';

const ShapeSelector = ({
  color,
  shape,
  onChange,
}: {
  color: string;
  shape: Shapes;
  onChange: (shape: Shapes) => void;
}) => {
  const [open, setOpen] = useState(false);

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
    <StyledShapeSelector>
      <div onClick={() => setOpen(!open)}>{shapes[shape]}</div>
      {open && (
        <motion.div className="shapes" animate={{ y: '45%' }} transition={{ type: 'spring' }}>
          {Object.values(shapes).map((shape) => shape)}
        </motion.div>
      )}
    </StyledShapeSelector>
  );
};

export default ShapeSelector;
