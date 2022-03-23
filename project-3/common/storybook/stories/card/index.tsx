import { CardContent, CardHeader, CardMedia, CardProps } from '@mui/material';
import { StyledCard, TypographyWithIcon } from './style';

const Card = (props: TCardProps) => {
  return (
    <StyledCard
      sx={props.sx}
      orientation={props.orientation || 'vertical'}
      data-testid="card"
    >
      <CardHeader title={props.title} subheader={props.subTitle} />
      {props.withInfo && (
        <CardContent>
          <TypographyWithIcon variant="h5">
            {props.temperature}
            <img src={`${props.icon}`} alt="Weather icon" />
          </TypographyWithIcon>
        </CardContent>
      )}
      {props.withImage && (
        <CardMedia component="img" image={props.image} alt="Card image" />
      )}
    </StyledCard>
  );
};

export default Card;

export type TCardProps = CardProps & {
  title: string;
  subTitle: string;
  temperature: string;
  icon: string;
  orientation: 'horizontal' | 'vertical';
  image: string;
  withImage: boolean;
  withInfo: boolean;
};
