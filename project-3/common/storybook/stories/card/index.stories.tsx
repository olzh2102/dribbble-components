import { ComponentStory } from '@storybook/react';
import Card from '.';

export default {
  title: 'Card',
  component: Card,
};

export const Template: ComponentStory<typeof Card> = (args: any) => {
  return <Card {...args} options={args.options} />;
};
