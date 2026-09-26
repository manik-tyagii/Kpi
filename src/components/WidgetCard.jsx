import {
  getKpiById,
  formatDelta,
  getDeltaClass,
  getDeltaArrow,
} from "../utils/helpers";

import { SIZE_DEFS, WIDGET_TYPES } from "../data/widgetTypes";

import LineChartWidget from "./charts/LineChartWidget";
import BarChartWidget from "./charts/BarChartWidget";
import AreaChartWidget from "./charts/AreaChartWidget";
import DonutChartWidget from "./charts/DonutChartWidget";
import GaugeWidget from "./charts/GaugeWidget";
import TableWidget from "./charts/TableWidget";
import CompareChart from "./charts/CompareChart";
import StatChartWidget from "./charts/StatChartWidget";

function WidgetCard({
  widget,
  selected,
  onSelect,
  onRemove,
  onSizeChange,
  onDrilldown,
}) {
  const kpi = getKpiById(widget.kpiId);

  if (!kpi) {
    return null;
  }

  const type = WIDGET_TYPES.find((item) => item.id === widget.type);

  const sizeClass = {
    l1: "col-span-6 min-[781px]:col-span-3",
    l2: "col-span-12 min-[781px]:col-span-6",
    l3: "col-span-12",
  };

  const deltaClass =
    getDeltaClass(kpi) === "pos"
      ? "text-[#1baf7a] bg-[rgba(27,175,122,0.10)]"
      : getDeltaClass(kpi) === "neg"
        ? "text-[#e34948] bg-[rgba(227,73,72,0.10)]"
        : "text-[#8e8e97] bg-[#f7f7f8]";

  const renderChart = () => {
    switch (widget.type) {
      case "stat":
        return <StatChartWidget kpi={kpi} />;

      case "line":
        return <LineChartWidget kpi={kpi} />;

      case "bar":
        return <BarChartWidget kpi={kpi} />;

      case "area":
        return <AreaChartWidget kpi={kpi} />;

      case "donut":
        return <DonutChartWidget kpi={kpi} />;

      case "gauge":
        return <GaugeWidget kpi={kpi} />;

      case "table":
        return <TableWidget kpi={kpi} />;

      case "compare":
        return <CompareChart compareIds={widget.compareIds} />;

      default:
        return null;
    }
  };

  /* =========================
     L1
  ========================= */

  const renderL1 = () => {
    if (widget.type === "gauge") {
      return (
        <div className="px-[14px] pt-[10px] pb-3 flex flex-col items-center">
          <div className="w-full max-w-[160px]">
            <GaugeWidget kpi={kpi} />
          </div>
        </div>
      );
    }

    return (
      <div className="px-[14px] pt-[14px] pb-3">
        <div className="text-[28px] font-bold tracking-[-1px] leading-none text-[#111113]">
          {kpi.unit === "$" ? "$" : ""}
          {kpi.valFmt}

          {kpi.unit !== "$" && (
            <span className="text-[14px] font-medium text-[#4a4a52] ml-px">
              {kpi.unit}
            </span>
          )}
        </div>

        <div className="flex items-center gap-[7px] mt-[6px] flex-wrap">
          <span
            className={`
              inline-flex
              items-center
              gap-[3px]
              text-[11px]
              font-bold
              px-[7px]
              py-[2px]
              rounded-[20px]
              ${deltaClass}
            `}
          >
            {getDeltaArrow(kpi)} {formatDelta(kpi)}
          </span>

          <span className="text-[11px] text-[#8e8e97]">Jul 2026</span>
        </div>

        <div className="text-[11px] text-[#4a4a52] leading-[1.5] mt-[9px] pt-[9px] border-t border-black/[0.08]">
          {kpi.desc}
        </div>
      </div>
    );
  };

  /* =========================
     L2
  ========================= */

  const renderL2 = () => {
    /*
      DONUT
      -------------------------
      Removed kpi.name + kpi.valFmt
      from beside the donut.
    */
    if (widget.type === "donut") {
      return (
        <div className="w-full">
          <DonutChartWidget kpi={kpi} />
        </div>
      );
    }

    if (widget.type === "table") {
      return (
        <div className="overflow-auto max-h-[220px]">
          <TableWidget kpi={kpi} />
        </div>
      );
    }

    return (
      <div className="flex">
        <div className="px-3 py-[14px] border-r border-black/[0.08] flex-[0_0_164px]">
          <div className="text-[28px] font-bold tracking-[-1px] leading-none text-[#111113]">
            {kpi.unit === "$" ? "$" : ""}
            {kpi.valFmt}

            {kpi.unit !== "$" && (
              <span className="text-[14px] font-medium text-[#4a4a52] ml-px">
                {kpi.unit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-[7px] mt-[6px] flex-wrap">
            <span
              className={`
                inline-flex
                items-center
                gap-[3px]
                text-[11px]
                font-bold
                px-[7px]
                py-[2px]
                rounded-[20px]
                ${deltaClass}
              `}
            >
              {getDeltaArrow(kpi)} {formatDelta(kpi)}
            </span>
          </div>

          <div className="text-[11px] text-[#8e8e97] mt-[6px]">Jul 2026</div>

          <div className="text-[11px] text-[#4a4a52] leading-[1.5] mt-[9px] pt-[9px] border-t border-black/[0.08]">
            {kpi.desc}
          </div>
        </div>

        <div className="flex-1 min-w-0 px-3 py-[10px] flex items-center">
          <div className="w-full h-[80px]">{renderChart()}</div>
        </div>
      </div>
    );
  };

  /* =========================
     L3
  ========================= */

  const renderL3 = () => {
    if (widget.type === "table") {
      return (
        <div className="overflow-auto max-h-[220px]">
          <TableWidget kpi={kpi} />
        </div>
      );
    }

    if (widget.type === "gauge") {
      return (
        <div className="px-[14px] pt-[14px] pb-3">
          <div className="relative h-[200px] flex items-center justify-center">
            <div className="w-full max-w-[160px]">
              <GaugeWidget kpi={kpi} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 pt-3 border-t border-black/[0.08]">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-[5px] text-[11px] text-[#4a4a52]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: kpi.color }}
                />

                {kpi.name}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[28px] font-bold tracking-[-1px] leading-none text-[#111113]">
                {kpi.unit === "$" ? "$" : ""}
                {kpi.valFmt}

                {kpi.unit !== "$" && (
                  <span className="text-[14px] font-medium text-[#4a4a52] ml-px">
                    {kpi.unit}
                  </span>
                )}
              </div>

              <div className="flex justify-end mt-[6px]">
                <span
                  className={`
                    inline-flex
                    items-center
                    gap-[3px]
                    text-[11px]
                    font-bold
                    px-[7px]
                    py-[2px]
                    rounded-[20px]
                    ${deltaClass}
                  `}
                >
                  {getDeltaArrow(kpi)} {formatDelta(kpi)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /*
      DONUT L3
      -------------------------
      Only chart is shown.
      Removed bottom KPI name/value section.
    */
    if (widget.type === "donut") {
      return (
        <div className="px-[14px] pt-[14px] pb-3">
          <div className="relative h-[200px]">
            <DonutChartWidget kpi={kpi} />
          </div>
        </div>
      );
    }

    return (
      <div className="px-[14px] pt-[14px] pb-3">
        <div className="relative h-[200px] mb-3">{renderChart()}</div>

        <div className="flex items-end justify-between gap-3 pt-3 border-t border-black/[0.08]">
          <div className="flex gap-3 flex-wrap items-center">
            {widget.type === "compare" && widget.compareIds ? (
              widget.compareIds.map((id) => {
                const compareKpi = getKpiById(id);

                return (
                  <div
                    key={id}
                    className="flex items-center gap-[5px] text-[11px] text-[#4a4a52]"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: compareKpi?.color || "#E20074",
                      }}
                    />

                    {compareKpi?.name}
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-[5px] text-[11px] text-[#4a4a52]">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: kpi.color }}
                />

                {kpi.name}
              </div>
            )}
          </div>

          <div className="text-right shrink-0">
            <div className="text-[28px] font-bold tracking-[-1px] leading-none text-[#111113]">
              {kpi.unit === "$" ? "$" : ""}
              {kpi.valFmt}

              {kpi.unit !== "$" && (
                <span className="text-[14px] font-medium text-[#4a4a52] ml-px">
                  {kpi.unit}
                </span>
              )}
            </div>

            <div className="flex justify-end mt-[6px]">
              <span
                className={`
                  inline-flex
                  items-center
                  gap-[3px]
                  text-[11px]
                  font-bold
                  px-[7px]
                  py-[2px]
                  rounded-[20px]
                  ${deltaClass}
                `}
              >
                {getDeltaArrow(kpi)} {formatDelta(kpi)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* =========================
     CARD
  ========================= */

  return (
    <div
      onClick={onSelect}
      className={`
        ${sizeClass[widget.size]}

        relative
        overflow-hidden
        bg-white
        rounded-[12px]
        border
        shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]
        transition-[box-shadow,transform,border-color]
        duration-[220ms]
        ease-[cubic-bezier(.4,0,.2,1)]

        ${
          selected
            ? "border-[#E20074] shadow-[0_2px_8px_rgba(0,0,0,0.10),0_12px_32px_rgba(0,0,0,0.10),0_0_0_2px_rgba(226,0,116,0.16)]"
            : "border-black/[0.08] hover:shadow-[0_2px_8px_rgba(0,0,0,0.10),0_12px_32px_rgba(0,0,0,0.10)]"
        }
      `}
    >
      {/* HEADER */}
      <div
        className="
          px-3
          pt-[10px]
          pb-2
          border-b
          border-black/[0.08]
          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            flex-1
            min-w-0
            text-[10px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-[#8e8e97]
            whitespace-nowrap
            overflow-hidden
            text-ellipsis
          "
        >
          {widget.type === "compare" && widget.compareIds
            ? widget.compareIds
                .map((id) => getKpiById(id)?.name)
                .filter(Boolean)
                .join(" vs ")
            : kpi.name}
        </span>

        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.05em]
            text-[#c4c4cc]
            shrink-0
          "
        >
          {type?.name || widget.type}
        </span>

        {/* SIZE PILL */}
        <div
          className="
            flex
            gap-[2px]
            bg-[#f7f7f8]
            p-[2px]
            rounded-[5px]
            shrink-0
          "
          onClick={(event) => event.stopPropagation()}
        >
          {SIZE_DEFS.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeChange(size.id)}
              className={`
                px-[7px]
                py-[2px]
                rounded-[3px]
                border-none
                text-[10px]
                font-bold
                leading-[1.6]
                transition-all

                ${
                  widget.size === size.id
                    ? "bg-white text-[#E20074] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                    : "bg-transparent text-[#c4c4cc]"
                }
              `}
            >
              {size.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      <div
        className={`
          absolute
          top-2
          right-2
          flex
          gap-1
          z-[5]
          transition-opacity
          duration-[220ms]

          ${
            selected
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
          }
        `}
      >
        <button
          type="button"
          title="Drill-down"
          onClick={(event) => {
            event.stopPropagation();
            onDrilldown();
          }}
          className="
            w-[26px]
            h-[26px]
            rounded-[6px]
            border
            border-black/[0.08]
            bg-white
            text-[#4a4a52]
            flex
            items-center
            justify-center
            text-[12px]
            shadow-[0_1px_4px_rgba(0,0,0,0.10)]
            transition-all
            hover:bg-[#E20074]
            hover:text-white
            hover:border-[#E20074]
          "
        >
          🔍
        </button>

        <button
          type="button"
          title="Remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="
            w-[26px]
            h-[26px]
            rounded-[6px]
            border
            border-black/[0.08]
            bg-white
            text-[#4a4a52]
            flex
            items-center
            justify-center
            text-[12px]
            shadow-[0_1px_4px_rgba(0,0,0,0.10)]
            transition-all
            hover:bg-[#e34948]
            hover:text-white
            hover:border-[#e34948]
          "
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      {widget.size === "l1" && renderL1()}
      {widget.size === "l2" && renderL2()}
      {widget.size === "l3" && renderL3()}
    </div>
  );
}

export default WidgetCard;
