import styled from 'styled-components';
import Link from 'next/link'

export const ButtonStyled = styled.button<{ variant: 'contained' | 'outlined' | 'text', disabled: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: ${({ variant }) => variant === 'outlined' ? '1px solid black' : 'none'};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
`

export const LinkStyled = styled(Link)`
   
`