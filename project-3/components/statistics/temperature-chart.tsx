import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

export default function TemperatureChart({ data }: any) {
  return (
    <AreaChart width={730} height={250} data={data?.hourly}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="temp"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dt" tick={renderCustomAxisTick} />
      <YAxis />
      <Tooltip
        labelFormatter={(value: number) =>
          `hours: ${new Date(value * 1000)
            .getHours()
            .toString()
            .padStart(2, '0')}`
        }
      />
    </AreaChart>
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
