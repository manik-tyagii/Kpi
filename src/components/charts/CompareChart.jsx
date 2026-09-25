import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { getKpiById } from "../../utils/helpers";

function CompareChart({ compareIds }) {
  const kpis = (compareIds || []).map((id) => getKpiById(id)).filter(Boolean);

  if (!kpis.length) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[#9999a1]">
        No KPIs selected for comparison
      </div>
    );
  }

  const months = kpis[0].months || [];

  const chartData = months.map((month, monthIndex) => {
    const row = { month };

    kpis.forEach((kpi, kpiIndex) => {
      row[`value${kpiIndex}`] = kpi.data?.[monthIndex];
    });

    return row;
  });

  const colors = ["#E20074", "#2a78d6", "#1baf7a", "#eb6834"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis dataKey="month" tick={{ fontSize: 9 }} />

        <YAxis tick={{ fontSize: 9 }} />

        <Tooltip />

        {kpis.map((kpi, index) => (
          <Line
            key={kpi.id}
            type="monotone"
            dataKey={`value${index}`}
            name={kpi.name}
            stroke={kpi.color || colors[index]}
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CompareChart;
