import styled from 'styled-components';

export const ButtonStyled = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AnchorStyled = styled.a<{ disabled: boolean }>`
    pointer-events: ${({ disabled }) => disabled && 'none'};
    cursor: pointer
`