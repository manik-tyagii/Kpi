import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function GaugeWidget({ kpi }) {
  const value = Number(kpi.val);

  const progress = Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 100)
    : 0;

  const chartData = [
    {
      name: "Progress",
      value: progress,
    },
    {
      name: "Remaining",
      value: 100 - progress,
    },
  ];

  return (
    <div className="h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius="65%"
            outerRadius="90%"
          >
            <Cell fill={kpi.color || "#E20074"} />

            <Cell fill="#eeeeef" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute left-0 right-0 bottom-3 text-center">
        <div className="text-2xl font-extrabold text-[#202026]">
          {kpi.valFmt}

          <span className="text-sm font-semibold text-[#777780] ml-0.5">
            {kpi.unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GaugeWidget;
