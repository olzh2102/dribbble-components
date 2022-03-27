import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function HumidityChart({ data }: any) {
  return (
    <BarChart id="humidity-chart" width={730} height={250} data={data?.hourly}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="humidity" tick={false} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="humidity" fill="#8884d8" />
    </BarChart>
  );
}
