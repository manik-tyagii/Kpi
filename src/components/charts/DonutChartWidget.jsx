import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function DonutChartWidget({ kpi }) {
  const regions = kpi.regions || {};

  const chartData = Object.entries(regions).map(([name, value]) => ({
    name,
    value,
  }));

  const colors = ["#E20074", "#2a78d6", "#1baf7a", "#eb6834", "#8b5cf6"];

  if (!chartData.length) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[#9999a1]">
        No regional data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
        >
          {chartData.map((item, index) => (
            <Cell key={item.name} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DonutChartWidget;
