import styled from 'styled-components';

export const StyledColor = styled.div<{ color: string }>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ color }) => color}
`

export const StyledColorSelector = styled.div`
    position: relative;

    /* from react-colorful package */
    .options {
        position: absolute;
        padding: 12px;
        border-radius: 8px;
        background-color: white;
    }
`

