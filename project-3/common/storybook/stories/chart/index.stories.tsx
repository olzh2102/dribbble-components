import { ComponentMeta, ComponentStory } from '@storybook/react';
import Chart, { TChartProps } from '.';

export default {
  title: 'Subpages/Chart',
  component: Chart,
  argTypes: {
    chartType: {
      options: ['area', 'bar', 'line'],
      control: { type: 'radio' },
      table: { category: 'View' },
    },
    areaProps: {
      table: { category: 'View' },
    },
    barProps: {
      table: { category: 'View' },
    },
    lineProps: {
      table: { category: 'View' },
    },
    gridProps: {
      table: { category: 'View' },
    },
    xAxisProps: {
      table: { category: 'View' },
    },
    yAxisProps: {
      table: { category: 'View' },
    },
    tooltipProps: {
      table: { category: 'View' },
    },
    title: {
      table: { category: 'Content' },
    },
    data: {
      table: { category: 'Content' },
    },
  },
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args: TChartProps) => {
  return <Chart {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  title: 'Chart title',
  chartType: 'area',
  areaProps: {
    dataKey: 'temp',
    fill: '#82ca9d',
    stroke: '#82ca9d',
    fillOpacity: 1,
    type: 'monotone',
  },
  barProps: {
    dataKey: 'temp',
    fill: '#82ca9d',
  },
  lineProps: {
    dataKey: 'temp',
    stroke: '#82ca9d',
    type: 'monotone',
  },
  gridProps: {
    strokeDasharray: '3 3',
  },
  xAxisProps: {
    dataKey: 'dt',
    tick: false,
  },
  yAxisProps: {},
  tooltipProps: {},
  data: [
    {
      dt: 1649325600,
      temp: 9.97,
      humidity: 57,
    },
    {
      dt: 1649329200,
      temp: 8.6,
      humidity: 66,
    },
    {
      dt: 1649332800,
      temp: 7.04,
      humidity: 74,
    },
    {
      dt: 1649336400,
      temp: 5.28,
      humidity: 83,
    },
    {
      dt: 1649340000,
      temp: 3.15,
      humidity: 88,
    },
    {
      dt: 1649343600,
      temp: 1.53,
      humidity: 88,
    },
    {
      dt: 1649347200,
      temp: 1.39,
      humidity: 86,
    },
  ],
};
