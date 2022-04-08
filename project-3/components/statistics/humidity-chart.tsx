import Chart from '@common/storybook/stories/chart';

export default function HumidityChart({ data }: any) {
  return (
    <Chart
      id="humidity-chart"
      width={730}
      height={250}
      data={data?.hourly}
      chartType="bar"
      barProps={{ dataKey: 'humidity', fill: '#8884d8' }}
      cartesianGridProps={{ strokeDasharray: '3 3' }}
      xAxisProps={{ dataKey: 'humidity', tick: false }}
    />
  );
}
