import React, { useState, useRef, useContext } from 'react';
import { RgbaColorPicker, RgbaColor } from 'react-colorful';
import { motion } from 'framer-motion';

import useOnClickOutside from '../../hooks/useOnOutsideClick';
import { StyledColor, StyledColorSelector } from './style';
import { SetBoxPositionContext } from '../../hooks/useSetBoxPosition';
import { colorSelectorPositionStyles as styles } from '../../constants';

const ColorSelector = ({
  onChange,
  color,
  hoverColor,
  onHoverColorChange,
}: Props) => {
  const ref = useRef<any>();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const { position } = useContext(SetBoxPositionContext);

  const handleChange = (color: RgbaColor) => {
    onChange(color);
    setOpen(false);
    onHoverColorChange({ ...color, a: 0.6 });
  };

  return (
    <StyledColorSelector hoverColor={hoverColor}>
      <StyledColor
        onClick={() => setOpen(!open)}
        color={color as string & RgbaColor}
      />
      {open && (
        <motion.div
          ref={ref}
          className="options"
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
          <RgbaColorPicker color={color} onChange={handleChange} />
        </motion.div>
      )}
    </StyledColorSelector>
  );
};

export default ColorSelector;

type Props = {
  onChange: (param: RgbaColor) => void;
  color: RgbaColor;
  hoverColor: RgbaColor;
  onHoverColorChange: (param: RgbaColor) => void;
};
