import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function GaugeWidget({ kpi }) {
  const value = Number(kpi?.val);

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
    <div className="relative w-full h-full min-h-[160px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={120}
        minHeight={120}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="58%"
            innerRadius="60%"
            outerRadius="82%"
            paddingAngle={0}
            stroke="none"
            // Animation
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={1800}
            animationEasing="ease-out"
          >
            <Cell fill={kpi?.color || "#E20074"} />
            <Cell fill="#EEEEEF" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Value */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center mt-8">
          <div className="text-2xl font-extrabold text-[#202026]">
            {kpi?.valFmt ?? value}
          </div>

          {kpi?.unit && (
            <span className="text-sm font-semibold text-[#777780] ml-1">
              {kpi.unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default GaugeWidget;
