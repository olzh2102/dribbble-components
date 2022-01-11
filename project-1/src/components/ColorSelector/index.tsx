import React, { useState } from 'react'
import { HexColorPicker } from "react-colorful";
import { motion } from 'framer-motion';

import { StyledColor, StyledColorSelector } from './style';

const ColorSelector = ({ onChange, color }: Props) => {
    const [open, setOpen] = useState(false);

    const handleChange = (color: string) => {
        onChange(color);
        setOpen(false)
    }

    return (
        <StyledColorSelector>
            <StyledColor onClick={() => setOpen(!open)} color={color} />
            {open && 
                <motion.div className="options" animate={{ y: '15%' }} transition={{ type: 'spring' }}>
                    <HexColorPicker color={color} onChange={handleChange} />
                </motion.div> 
            }
        </StyledColorSelector>
    )
}

export default ColorSelector

type Props = {
    onChange: (color: string) => void; 
    color: string
}