import styled from 'styled-components';
import { RgbaColor } from "react-colorful";

export const StyledColor = styled.div<{ color: RgbaColor }>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ color }) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}  
`

export const StyledColorSelector = styled.div<{ hoverColor: RgbaColor }>`
    position: relative;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;

    &:hover {
      background-color: ${({ hoverColor }) => `rgba(${hoverColor.r}, ${hoverColor.g}, ${hoverColor.b}, ${hoverColor.a})`};
    }

    /* from react-colorful package */
    .options {
        position: absolute;
        padding: 12px;
        border-radius: 8px;
        background-color: white;
    }
`

