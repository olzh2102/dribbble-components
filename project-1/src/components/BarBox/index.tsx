import { useContext, useEffect, useState } from 'react';
import { RgbaColor } from 'react-colorful';

import { Shapes } from '../../types';
import { toHex } from '../../utils';
import ShapeSelector from '../ShapeSelector';
import ColorSelector from '../ColorSelector';
import ImageUploader from '../ImageUploader';

import Box from './style';
import { SetBoxPositionContext } from '../../hooks/useSetBoxPosition';
import { barBoxPositionStyles as styles } from '../../constants';

const BarBox = () => {
  const [shape, setShape] = useState<Shapes>('line');
  const [color, setColor] = useState<RgbaColor>({ r: 64, g: 45, b: 104, a: 1 });
  const [hoverColor, setHoverColor] = useState<RgbaColor>({
    r: 64,
    g: 45,
    b: 104,
    a: 0.6,
  });
  const [images, setImages] = useState<File[]>([]);

  const { position, setPosition } = useContext(SetBoxPositionContext);

  const [state, setState] = useState<any>(styles[position]);

  const pressKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') setPosition('top');
    if (e.key === 'ArrowDown') setPosition('bottom');
    if (e.key === 'ArrowLeft') setPosition('left');
    if (e.key === 'ArrowRight') setPosition('right');
  };

  window.addEventListener('keydown', pressKey);

  useEffect(() => {
    setState(styles[position]);
  }, [position]);

  return (
    <Box state={state}>
      <div className="section">
        <div className="items">
          <ShapeSelector
            color={toHex(
              `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
            )}
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
            color={toHex(
              `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
            )}
          />
        </div>
      </div>
    </Box>
  );
};

export default BarBox;
