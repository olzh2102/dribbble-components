import Link from 'next/link'

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
        <Link href={to}><AnchorButton {...props} /></Link> : <button type="button">{label}</button>
}

export default Button;

const AnchorButton = ({ label }: any) => {
    return (
        <a>{label}</a>
    )
}

type Props = {
    as: 'button' | 'link';
    to: string;
    onClick: () => void;
    icon?: React.ReactElement | null;
    label: string;
    disabled?: boolean;
    variant: 'contained' | 'text' | 'outlined';
    startIcon?: React.ReactElement | null;
    endIcon?: React.ReactElement | null;
}