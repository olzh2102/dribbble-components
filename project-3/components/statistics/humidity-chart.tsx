import Chart from '@common/storybook/stories/chart';

export default function HumidityChart({ data }: any) {
  return (
    <Chart
      id="humidity-chart"
      data={data?.hourly}
      title="Humidity"
      chartType="bar"
      barProps={{ dataKey: 'humidity', fill: '#8884d8' }}
      gridProps={{ strokeDasharray: '3 3' }}
      xAxisProps={{ dataKey: 'humidity', tick: false }}
    />
  );
}
