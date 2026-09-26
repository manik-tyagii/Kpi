import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function StatChartWidget({ kpi }) {
  const labels = kpi.labels || kpi.months || [];
  const values = kpi.data || [];

  const chartData = labels
    .map((label, index) => ({
      label,
      value: Number(values[index]) || 0,
    }))
    .filter((item) => item.label !== undefined && item.label !== null);

  if (!chartData.length) {
    return (
      <div className="h-full w-full flex items-center justify-center text-xs text-[#9999a1]">
        No chart data available
      </div>
    );
  }

  const color = kpi.color || "#E20074";

  const CustomCell = (props) => {
    const { cx, cy, payload } = props;

    const maxValue = Math.max(...values.map(Number));
    const intensity = maxValue ? payload.value / maxValue : 0;

    const size = 18 + intensity * 22;

    return (
      <g>
        <rect
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
          rx={4}
          fill={color}
          opacity={0.25 + intensity * 0.75}
        />

        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={9}
          fill="#ffffff"
          fontWeight="600"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 15,
          right: 15,
          bottom: 15,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />

        <XAxis
          type="category"
          dataKey="label"
          name="Category"
          allowDuplicatedCategory={false}
          tick={{ fontSize: 9, fill: "#666" }}
        />

        <YAxis
          type="number"
          dataKey="value"
          tick={{ fontSize: 9, fill: "#666" }}
        />

        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            fontSize: 11,
            borderRadius: 6,
          }}
        />

        <Scatter data={chartData} shape={<CustomCell />} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default StatChartWidget;
