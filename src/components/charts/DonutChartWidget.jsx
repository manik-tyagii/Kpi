import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function DonutChartWidget({ kpi }) {
  const regions = kpi.regions || {};

  const chartData = Object.entries(regions).map(([name, value]) => ({
    name,
    value: Number(value),
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
    <div className="flex items-center gap-4 px-3 py-[14px]">
      {/* Donut */}
      <div className="w-[110px] h-[110px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="65%"
              outerRadius="100%"
              paddingAngle={0}
              stroke="#fff"
              strokeWidth={2}
            >
              {chartData.map((item, index) => (
                <Cell key={item.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0d0101",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 ">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-[7px] text-[12px] text-[#5f5f68]"
          >
            <span
              className="w-[9px] h-[9px] rounded-[2px] flex-shrink-0"
              style={{
                backgroundColor: colors[index % colors.length],
              }}
            />

            <span>{item.name}</span>

            <span className="text-[12px] font-bold text-[#202027] ml-auto pl-3">
              {item.value.toLocaleString("en-US")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChartWidget;
