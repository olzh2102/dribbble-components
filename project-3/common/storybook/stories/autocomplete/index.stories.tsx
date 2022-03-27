import { ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Autocomplete from '.';

export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
};

const Template: ComponentStory<typeof Autocomplete> = (args: any) => {
  const [val, setVal] = useState([]);

  return (
    <Autocomplete
      {...args}
      options={args.options}
      onChange={(evt, val) => setVal(val)}
    />
  );
};

export const Standard = Template.bind({});
Standard.args = {
  options: [
    { label: 'option 1', name: 'option 1' },
    { label: 'option 2', name: 'option 2' },
    { label: 'option 3', name: 'option 3' },
    { label: 'option 4', name: 'option 4' },
  ],
};
