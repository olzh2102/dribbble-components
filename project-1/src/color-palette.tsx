import React from 'react'
import { HexColorPicker } from "react-colorful";

const ColorPalette = () => {
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('#fff');
    return (
        <div onClick={() => setOpen((old) => !old)} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'purple'}}>
            {open ? <HexColorPicker color={color} /> : null}
        </div>

    )
}

export default ColorPalette;