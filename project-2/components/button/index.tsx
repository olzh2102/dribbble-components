import Link from 'next/link'
import { ButtonStyled, LinkStyled } from './style';

const Button = (props: Props) => {
    const {
        as = 'button',
        to = '/',
        onClick,
        icon = null,
        label,
        disabled = false,
        variant,
        startIcon = null,
        endIcon = null
    } = props
    return as == 'link' ?  
        <LinkStyled href={to}><a>{label}</a></LinkStyled> : 
        <ButtonStyled 
            {...props} 
            type="button"
            disabled={disabled} 
            onClick={onClick} 
            variant={variant}
        >
            {startIcon != null && startIcon} 
            {label ? label : icon} 
            {endIcon != null && endIcon}
        </ButtonStyled>
}

export default Button;

type Props = {
    as?: 'button' | 'link';
    to?: string;
    onClick?: () => void;
    icon?: React.ReactElement | null;
    label?: string;
    disabled?: boolean;
    variant: 'contained' | 'text' | 'outlined';
    startIcon?: React.ReactElement | null;
    endIcon?: React.ReactElement | null;
}