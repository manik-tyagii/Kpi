import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AreaChartWidget({ kpi }) {
  const months = kpi.months || [];
  const values = kpi.data || [];

  const chartData = months
    .map((month, index) => ({
      month,
      value: values[index],
    }))
    .filter((item) => item.value !== undefined);

  if (!chartData.length) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[#9999a1]">
        No chart data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey="month" tick={{ fontSize: 9 }} />

        <YAxis tick={{ fontSize: 9 }} />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke={kpi.color || "#E20074"}
          fill={kpi.color || "#E20074"}
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartWidget;
