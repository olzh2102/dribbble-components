import React, { useState } from 'react';
import { RgbaColor } from "react-colorful";

import { Shapes } from '../../types';
import { toHex } from '../../utils';
import ShapeSelector from '../ShapeSelector';
import ColorSelector from '../ColorSelector';
import ImageUploader from '../ImageUploader';

import Box from './style';

const BarBox = () => {
  const [shape, setShape] = useState<Shapes>('line');
  const [color, setColor] = useState<RgbaColor>({"r":64,"g":45,"b":104,"a":1});
  const [hoverColor, setHoverColor] = useState<RgbaColor>({"r":64,"g":45,"b":104,"a":0.6});
  const [images, setImages] = useState<File[]>([])

  return (
    <Box>
      <div className="section">
        <div className="items">
          <ShapeSelector 
            color={toHex(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)} 
            shape={shape} 
            onChange={setShape} 
          />
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
          <ImageUploader 
            onImageUpload={setImages} 
            color={toHex(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)}
          />
        </div>
      </div>
    </Box>
  );
};

export default BarBox;

