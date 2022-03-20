import { CardHeader, CardProps } from '@mui/material';
import { StyledCard } from './style';

const Card = (props: TCardProps) => {
  return (
    <StyledCard sx={props.sx}>
      <CardHeader title={props.title} subheader={props.subTitle} />
      {props.children}
    </StyledCard>
  );
};

export default Card;

export type TCardProps = CardProps & {
  title: string;
  subTitle: string;
  children: JSX.Element;
};
