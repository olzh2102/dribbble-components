import React from 'react';
import { baseTheme } from '../../styles/theme';
import { LineIcon, UploadImageIcon } from '../Icons';
import Box from './style';

const BarBox = () => (
  <Box>
    <div className="section">
      <div className="items">
        <LineIcon color={baseTheme.colors.selected} />
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

export default BarBox;
