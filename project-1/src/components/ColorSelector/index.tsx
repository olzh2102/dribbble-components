import React, { useState } from 'react'
import { RgbaColorPicker, RgbaColor } from "react-colorful";
import { motion } from 'framer-motion';

import { StyledColor, StyledColorSelector } from './style';

const ColorSelector = ({ onChange, color, hoverColor, onHoverColorChange }: Props) => {
    const [open, setOpen] = useState(false);

    const handleChange = (color: RgbaColor) => {
        onChange(color);
        setOpen(false)
        onHoverColorChange({ ...color, a: 0.6 })
    }

    return (
        <StyledColorSelector hoverColor={hoverColor}>
            <StyledColor onClick={() => setOpen(!open)} color={color as string & RgbaColor} />
            {open && 
                <motion.div className="options" animate={{ y: '15%' }} transition={{ type: 'spring' }}>
                    <RgbaColorPicker color={color} onChange={handleChange} />
                </motion.div> 
            }
        </StyledColorSelector>
    )
}

export default ColorSelector

type Props = {
    onChange: (param: RgbaColor) => void; 
    color: RgbaColor;
    hoverColor: RgbaColor;
    onHoverColorChange: (param: RgbaColor) => void;
}