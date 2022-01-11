import React, { useState } from 'react';

import { baseTheme } from '../../styles/theme';
import { Shapes } from '../../types';

import ShapeSelector from '../ShapeSelector';
import ColorSelector from '../ColorSelector';
import { UploadImageIcon } from '../Icons';

import Box from './style';

const BarBox = () => {
  const [shape, setShape] = useState<Shapes>('line');
  const [color, setColor] = useState('#fff');

  return (
    <Box>
      <div className="section">
        <div className="items">
          <ShapeSelector color={baseTheme.colors.font} shape={shape} onChange={setShape} />
        </div>

        <div className="items">
          <ColorSelector 
            onChange={setColor}
            color={color}
          />
        </div>
      </div>

      <div className="section">
        <div className="items">
          <UploadImageIcon color={baseTheme.colors.font} />
        </div>
      </div>
    </Box>
  );
};

export default BarBox;
