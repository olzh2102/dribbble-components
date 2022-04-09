import {
  Area,
  AreaChart,
  AreaProps,
  Bar,
  BarChart,
  BarProps,
  CartesianGrid,
  CartesianGridProps,
  Line,
  LineChart,
  LineProps,
  Tooltip,
  TooltipProps,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';

const ChartContainer = (props: TChartProps) => {
  let {
    data,
    chartType,
    children,
    areaProps,
    barProps,
    lineProps,
    width,
    height,
    ...rest
  } = props;

  width = width || 730;
  height = height || 250;

  switch (chartType) {
    case 'area':
      return (
        <AreaChart data={data} width={width} height={height} {...rest}>
          {children}
          {areaProps && <Area {...areaProps} />}
        </AreaChart>
      );
    case 'bar':
      return (
        <BarChart data={data} width={width} height={height} {...rest}>
          {children}
          {barProps && <Bar {...barProps} />}
        </BarChart>
      );
    default:
      return (
        <LineChart data={data} width={width} height={height} {...rest}>
          {children}
          {lineProps && <Line {...lineProps} />}
        </LineChart>
      );
  }
};

const Chart = (props: TChartProps) => {
  const { gridProps, children, xAxisProps, yAxisProps, tooltipProps, ...rest } =
    props;

  return (
    <ChartContainer {...rest}>
      <CartesianGrid {...gridProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
      <Tooltip {...tooltipProps} />
      {children}
    </ChartContainer>
  );
};

export default Chart;

type chardTypeProps<P, T> = Omit<P, 'ref'> & {
  ref?: React.RefObject<SVGPathElement & T>;
};

export type TChartProps = CategoricalChartProps & {
  data: any;
  chartType: 'area' | 'bar' | 'line';
  areaProps?: chardTypeProps<AreaProps, Area>;
  barProps?: chardTypeProps<BarProps, Bar>;
  lineProps?: chardTypeProps<LineProps, Line>;
  gridProps?: Omit<CartesianGridProps, 'ref'> & {
    ref?: React.RefObject<SVGPathElement & CartesianGrid>;
  };
  xAxisProps?: XAxisProps;
  yAxisProps?: YAxisProps;
  tooltipProps?: TooltipProps<string, string>;
};
