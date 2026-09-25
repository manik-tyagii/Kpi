import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DrilldownModal({ kpi, onClose }) {
  if (!kpi) return null;

  // =========================================
  // MONTHLY DATA
  // =========================================

  const months = Array.isArray(kpi.months) ? kpi.months : [];
  const values = Array.isArray(kpi.data) ? kpi.data : [];

  const monthlyData = months
    .map((month, index) => ({
      month,
      value: Number(values[index]),
    }))
    .filter((item) => Number.isFinite(item.value));

  // =========================================
  // CURRENT VALUE
  // =========================================

  const currentValue =
    monthlyData.length > 0
      ? monthlyData[monthlyData.length - 1].value
      : Number(kpi.val) || 0;

  // =========================================
  // PREVIOUS VALUE
  // =========================================

  const previousValue =
    monthlyData.length > 1 ? monthlyData[monthlyData.length - 2].value : null;

  // =========================================
  // MOM CHANGE
  // =========================================

  const momChange =
    previousValue !== null && previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : null;

  // =========================================
  // PERIOD CHANGE
  // =========================================

  const firstValue = monthlyData.length > 0 ? monthlyData[0].value : null;

  const periodChange =
    firstValue !== null && firstValue !== 0
      ? ((currentValue - firstValue) / firstValue) * 100
      : null;

  // =========================================
  // PERIOD AVERAGE
  // =========================================

  const periodAverage =
    monthlyData.length > 0
      ? monthlyData.reduce((sum, item) => sum + item.value, 0) /
        monthlyData.length
      : null;

  // =========================================
  // REGIONAL DATA
  // =========================================

  const regionData = Object.entries(kpi.regions || {}).map(
    ([region, value]) => ({
      region,
      value: Number(value) || 0,
    }),
  );

  // =========================================
  // FORMAT NUMBER
  // =========================================

  const formatNumber = (value) => {
    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(Number(value))
    ) {
      return "-";
    }

    return Number(value).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  // =========================================
  // FORMAT VALUE
  // =========================================

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return "-";
    }

    return `${formatNumber(value)}${kpi.unit || ""}`;
  };

  // =========================================
  // FORMAT PERCENT
  // =========================================

  const formatPercent = (value) => {
    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(Number(value))
    ) {
      return "—";
    }

    const sign = Number(value) >= 0 ? "+" : "";

    return `${sign}${Number(value).toFixed(2)}%`;
  };

  // =========================================
  // CHART Y-AXIS DOMAIN
  // =========================================

  let chartMin = 0;
  let chartMax = 100;

  if (monthlyData.length > 0) {
    const chartValues = monthlyData.map((item) => item.value);

    const minValue = Math.min(...chartValues);
    const maxValue = Math.max(...chartValues);

    const range = maxValue - minValue;

    if (range > 0) {
      const padding = range * 0.15;

      chartMin = minValue - padding;
      chartMax = maxValue + padding;
    } else {
      const padding = Math.abs(maxValue) * 0.05 || 1;

      chartMin = minValue - padding;
      chartMax = maxValue + padding;
    }
  }

  // Round domain nicely
  const domainRange = chartMax - chartMin;
  const step = domainRange > 0 ? domainRange / 5 : 1;

  chartMin = Math.floor(chartMin / step) * step;
  chartMax = Math.ceil(chartMax / step) * step;

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-[rgba(0,0,0,0.55)]
        backdrop-blur-[4px]
        flex
        items-center
        justify-center
        p-5
      "
      onClick={onClose}
    >
      {/* =====================================
          MODAL PANEL
      ===================================== */}

      <div
        className="
          bg-white
          rounded-[16px]
          shadow-[0_4px_16px_rgba(0,0,0,0.14),0_24px_64px_rgba(0,0,0,0.14)]
          w-full
          max-w-[860px]
          max-h-[90vh]
          overflow-y-auto
          flex
          flex-col
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            px-[22px]
            pt-[18px]
            pb-[14px]
            border-b
            border-black/[0.08]
            flex
            items-start
            gap-3
            shrink-0
          "
        >
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] font-bold text-[#111113] mb-[2px]">
              {kpi.name}
            </h2>

            <p className="text-xs text-[#8e8e97]">
              National · Monthly – Aug'26
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[28px] font-bold text-[#111113]">
                {formatValue(currentValue)}
              </div>

              <div
                className={`
                  inline-flex
                  items-center
                  mt-1
                  px-[7px]
                  py-[2px]
                  rounded-[20px]
                  text-[11px]
                  font-semibold
                  ${
                    momChange !== null && momChange >= 0
                      ? "bg-[rgba(27,175,122,0.10)] text-[#1baf7a]"
                      : "bg-[rgba(227,73,72,0.10)] text-[#e34948]"
                  }
                `}
              >
                {momChange !== null && momChange >= 0 ? "▲" : "▼"}

                <span className="ml-1">{formatPercent(momChange)}</span>
              </div>
            </div>

            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              className="
                w-8
                h-8
                border
                border-black/[0.08]
                rounded-lg
                bg-[#f7f7f8]
                text-[#4a4a52]
                text-base
                flex
                items-center
                justify-center
                transition-all
                hover:bg-[rgba(227,73,72,0.10)]
                hover:text-[#e34948]
              "
            >
              ✕
            </button>
          </div>
        </div>

        {/* =====================================
            BODY
        ===================================== */}

        <div className="p-5 flex-1">
          {/* =====================================
              KPI SUMMARY
          ===================================== */}

          <div className="grid grid-cols-4 gap-2.5 mb-[18px]">
            {/* CURRENT */}
            <div
              className="
                bg-[#f7f7f8]
                border
                border-black/[0.08]
                rounded-[8px]
                p-3
              "
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[6px]">
                Current
              </div>

              <div className="text-[18px] font-bold text-[#111113]">
                {formatValue(currentValue)}
              </div>

              <div className="text-[11px] text-[#4a4a52] mt-[3px]">
                {months.length > 0
                  ? `${months[months.length - 1]} '26`
                  : "Current"}
              </div>
            </div>

            {/* MOM */}
            <div
              className="
                bg-[#f7f7f8]
                border
                border-black/[0.08]
                rounded-[8px]
                p-3
              "
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[6px]">
                MoM Change
              </div>

              <div className="text-[18px] font-bold text-[#111113]">
                {formatPercent(momChange)}
              </div>

              <div className="text-[11px] font-semibold mt-[3px]">
                {previousValue !== null
                  ? `vs ${months[months.length - 2]} '26`
                  : "vs previous"}
              </div>
            </div>

            {/* PERIOD CHANGE */}
            <div
              className="
                bg-[#f7f7f8]
                border
                border-black/[0.08]
                rounded-[8px]
                p-3
              "
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[6px]">
                6-Mo Change
              </div>

              <div className="text-[18px] font-bold text-[#111113]">
                {formatPercent(periodChange)}
              </div>

              <div className="text-[11px] font-semibold mt-[3px]">
                {months.length > 0 ? `vs ${months[0]} '26` : "vs beginning"}
              </div>
            </div>

            {/* AVERAGE */}
            <div
              className="
                bg-[#f7f7f8]
                border
                border-black/[0.08]
                rounded-[8px]
                p-3
              "
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[6px]">
                Period Avg
              </div>

              <div className="text-[18px] font-bold text-[#111113]">
                {formatValue(periodAverage)}
              </div>

              <div className="text-[11px] text-[#4a4a52] mt-[3px]">
                {months.length > 0
                  ? `${months[0]} – ${months[months.length - 1]} '26`
                  : "Period"}
              </div>
            </div>
          </div>

          {/* =====================================
              CHARTS
          ===================================== */}

          <div className="grid grid-cols-[2fr_1fr] gap-4 mb-[18px]">
            {/* 6 MONTH TREND */}
            <div
              className="
                bg-[#f7f7f8]
                rounded-[8px]
                border
                border-black/[0.08]
                p-[14px_14px_10px]
              "
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[10px]">
                {kpi.name} — 6-Month Trend
              </div>

              <div className="relative h-[180px]">
                {monthlyData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-[#8e8e97]">
                    No trend data available
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="drilldownGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={kpi.color || "#E20074"}
                            stopOpacity={0.22}
                          />

                          <stop
                            offset="100%"
                            stopColor={kpi.color || "#E20074"}
                            stopOpacity={0.03}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        stroke="#e4e4e6"
                        strokeDasharray="0"
                        vertical
                        horizontal
                      />

                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 9,
                          fill: "#8e8e97",
                        }}
                        axisLine={{
                          stroke: "#dddddf",
                        }}
                        tickLine={false}
                      />

                      <YAxis
                        domain={[chartMin, chartMax]}
                        tickCount={6}
                        tick={{
                          fontSize: 9,
                          fill: "#8e8e97",
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={48}
                        tickFormatter={(value) =>
                          Number(value).toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })
                        }
                      />

                      <Tooltip
                        formatter={(value) => [formatValue(value), kpi.name]}
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={kpi.color || "#E20074"}
                        strokeWidth={2}
                        fill="url(#drilldownGradient)"
                        dot={{
                          r: 4,
                          fill: kpi.color || "#E20074",
                          stroke: "#ffffff",
                          strokeWidth: 2,
                        }}
                        activeDot={{
                          r: 5,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* REGIONAL SPLIT */}
            <div
              className="
                bg-[#f7f7f8]
                rounded-[8px]
                border
                border-black/[0.08]
                p-[14px_14px_10px]
              "
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#8e8e97] mb-[10px]">
                Regional Split
              </div>

              <div className="relative h-[180px]">
                {regionData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-[#8e8e97]">
                    No regional data
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={regionData}
                      layout="vertical"
                      margin={{
                        top: 0,
                        right: 5,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <XAxis
                        type="number"
                        tick={{
                          fontSize: 8,
                          fill: "#8e8e97",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <YAxis
                        type="category"
                        dataKey="region"
                        tick={{
                          fontSize: 8,
                          fill: "#8e8e97",
                        }}
                        axisLine={false}
                        tickLine={false}
                        width={55}
                      />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill={kpi.color || "#E20074"}
                        radius={[0, 4, 4, 0]}
                        barSize={17}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* =====================================
              MONTHLY DETAIL
          ===================================== */}

          <div
            className="
              border
              border-black/[0.08]
              rounded-[8px]
              overflow-hidden
            "
          >
            <div
              className="
                px-[14px]
                py-[10px]
                text-[11px]
                font-bold
                uppercase
                tracking-[0.07em]
                text-[#8e8e97]
                border-b
                border-black/[0.08]
              "
            >
              Monthly Detail
            </div>

            <div className="overflow-auto max-h-[200px]">
              {monthlyData.length === 0 ? (
                <div className="h-[120px] flex items-center justify-center text-xs text-[#8e8e97]">
                  No monthly data available
                </div>
              ) : (
                <table className="w-full border-collapse text-xs">
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th className="px-[14px] py-[7px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#8e8e97]">
                        Month
                      </th>

                      <th className="px-[14px] py-[7px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#8e8e97]">
                        Value
                      </th>

                      <th className="px-[14px] py-[7px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#8e8e97]">
                        MoM Δ
                      </th>

                      <th className="px-[14px] py-[7px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#8e8e97]">
                        MoM %
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {monthlyData.map((item, index) => {
                      const previous =
                        index > 0 ? monthlyData[index - 1].value : null;

                      const delta =
                        previous !== null ? item.value - previous : null;

                      const percent =
                        previous !== null && previous !== 0
                          ? ((item.value - previous) / previous) * 100
                          : null;

                      return (
                        <tr
                          key={`${item.month}-${index}`}
                          className="hover:bg-[rgba(0,0,0,0.02)]"
                        >
                          <td className="px-[14px] py-2 border-t border-black/[0.08] text-[#4a4a52]">
                            {item.month} '26
                          </td>

                          <td className="px-[14px] py-2 border-t border-black/[0.08] text-[#4a4a52]">
                            {formatValue(item.value)}
                          </td>

                          <td className="px-[14px] py-2 border-t border-black/[0.08] text-[#4a4a52]">
                            {delta !== null
                              ? `${delta >= 0 ? "+" : ""}${formatNumber(delta)}`
                              : "—"}
                          </td>

                          <td className="px-[14px] py-2 border-t border-black/[0.08] text-[#4a4a52]">
                            {formatPercent(percent)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrilldownModal;
