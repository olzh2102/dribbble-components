import React, { useState } from 'react';
import { baseTheme } from '../../styles/theme';
import { Shapes } from '../../types';
import { UploadImageIcon } from '../Icons';
import ShapeSelector from '../ShapeSelector';
import Box from './style';

const BarBox = () => {
  const [shape, setShape] = useState<Shapes>('line');

  return (
    <Box>
      <div className="section">
        <div className="items">
          <ShapeSelector color={baseTheme.colors.font} shape={shape} onChange={setShape} />
        </div>
        <div className="items">
          <div className="color-picker"></div>
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
