import Chart from '@common/storybook/stories/chart';

export default function TemperatureChart({ data }: any) {
  return (
    <Chart
      width={730}
      height={250}
      chartType="area"
      data={data?.hourly}
      areaProps={{
        dataKey: 'temp',
        type: 'monotone',
        stroke: '#82ca9d',
        fill: 'url(#colorUv)',
        fillOpacity: 1,
      }}
      cartesianGridProps={{ strokeDasharray: '3 3' }}
      xAxisProps={{ dataKey: 'dt', tick: renderCustomAxisTick }}
      tooltipProps={{
        labelFormatter: (value: number) =>
          `hours: ${new Date(value * 1000)
            .getHours()
            .toString()
            .padStart(2, '0')}`,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.05} />
        </linearGradient>
      </defs>
    </Chart>
  );
}

function renderCustomAxisTick({
  x,
  y,
  payload,
}: {
  x: number;
  y: number;
  payload: { value: number };
}) {
  const hours = new Date(payload.value * 1000).getHours();

  return (
    <text x={x - 10} y={y + 15}>
      {hours.toString().padStart(2, '0')}
    </text>
  );
}
