const Button = ({
    as = 'button',
    onClick,
    icon = null,
    label,
    disabled = false,
    variant,
    startIcon = null,
    endIcon = null
}: Props) => {
    return <div>here will go button component</div>
}

export default Button;

type Props = {
    as: 'button' | 'link';
    onClick: () => void;
    icon?: React.ReactElement | null;
    label: string;
    disabled?: boolean;
    variant: 'contained' | 'text' | 'outlined';
    startIcon?: React.ReactElement | null;
    endIcon?: React.ReactElement | null;
}