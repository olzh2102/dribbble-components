import React, { useState } from 'react';

import { baseTheme } from '../../styles/theme';
import { Shapes } from '../../types';

import ShapeSelector from '../ShapeSelector';
import ColorSelector from '../ColorSelector';
import { UploadImageIcon } from '../Icons';

import Box from './style';

const BarBox = () => {
  const [shape, setShape] = useState<Shapes>('line');
  const [color, setColor] = useState({"r":64,"g":45,"b":104,"a":1});
  const [hoverColor, setHoverColor] = useState({"r":64,"g":45,"b":104,"a":0.6});

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
            hoverColor={hoverColor}
            onHoverColorChange={setHoverColor}
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
