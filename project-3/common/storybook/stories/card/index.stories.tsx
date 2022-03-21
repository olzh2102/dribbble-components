import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card, { TCardProps } from '.';

import cityImage from '../../../../assets/images/tokyo.jpg';
import weatherIcon from '../../../../assets/images/11d.png';

export default {
  title: 'Subpages/Card',
  component: Card,
  argTypes: {
    withImage: {
      table: { category: 'Optional' },
      control: { type: 'boolean' },
    },
    withInfo: {
      table: { category: 'Optional' },
      control: { type: 'boolean' },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: { category: 'View' },
    },
    title: {
      table: { category: 'Content' },
    },
    subTitle: {
      table: { category: 'Content' },
    },
    temperature: {
      table: { category: 'Content' },
    },
    icon: {
      table: { category: 'Content' },
    },
    image: {
      table: { category: 'Content' },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: TCardProps) => {
  return <Card {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  orientation: 'vertical',
  withImage: true,
  withInfo: true,
  title: 'Tokyo',
  subTitle: 'Japan',
  temperature: '+7º',
  icon: String(weatherIcon),
  image: String(cityImage),
};
