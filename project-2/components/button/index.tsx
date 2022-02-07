import Link from 'next/link'
import { ButtonStyled, AnchorStyled } from './style';

const Button = (props: Props) => {
    const {
        as = 'button',
        to='',
        onClick,
        icon = null,
        label,
        disabled = false,
        variant,
        startIcon = null,
        endIcon = null
    } = props
    return as == 'link' ?  
        <Link href={to}><AnchorButton {...props} /></Link> : 
        <ButtonStyled type="button" onClick={onClick}>
            {startIcon != null && startIcon} 
            {label ? label : icon} 
            {endIcon != null && endIcon}
        </ButtonStyled>
}

export default Button;

const AnchorButton = ({ label, disabled }: any) => {
    return (
        <AnchorStyled disabled={disabled}>{label}</AnchorStyled>
    )
}

type Props = {
    as?: 'button' | 'link';
    to?: string;
    onClick: () => void;
    icon?: React.ReactElement | null;
    label?: string;
    disabled?: boolean;
    variant: 'contained' | 'text' | 'outlined';
    startIcon?: React.ReactElement | null;
    endIcon?: React.ReactElement | null;
}