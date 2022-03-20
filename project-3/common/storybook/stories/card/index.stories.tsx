import CardMedia from '@mui/material/CardMedia';
import { ComponentStory, Meta } from '@storybook/react';
import Card, { TCardProps } from '.';

import cityImage from '../../../../assets/images/tokyo.jpg';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: ComponentStory<typeof Card> = (args: TCardProps) => {
  return <Card {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  title: 'Tokyo',
  subTitle: 'Japan',
  children: (
    <CardMedia component="img" image={`${cityImage}`} alt="Card image" />
  ),
  sx: { maxWidth: 250 },
};
