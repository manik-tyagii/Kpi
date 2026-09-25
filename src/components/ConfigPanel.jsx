import { WIDGET_TYPES, SIZE_DEFS } from "../data/widgetTypes";
import { getKpiById } from "../utils/helpers";

function ConfigPanel({
  widget,
  onClose,
  onTypeChange,
  onSizeChange,
  onDrilldown,
  onRemove,
}) {
  if (!widget) {
    return null;
  }

  const kpi = getKpiById(widget.kpiId);

  if (!kpi) {
    return null;
  }

  return (
    <aside
      className="
        w-[256px]
        min-w-[256px]
        h-full
        bg-white
        border-l
        border-black/[0.08]
        flex
        flex-col
        shrink-0
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          px-[14px]
          pt-[14px]
          pb-[10px]
          border-b
          border-black/[0.08]
          flex
          items-center
          justify-between
          shrink-0
        "
      >
        <h3 className="text-[13px] font-bold text-[#111113]">
          Widget Settings
        </h3>

        <button
          type="button"
          onClick={onClose}
          className="
            w-6
            h-6
            border-none
            bg-[#f7f7f8]
            rounded-[6px]
            text-[#8e8e97]
            text-[14px]
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

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto p-[14px]">
        {/* KPI Info */}
        <div className="bg-[#f7f7f8] rounded-[8px] p-[10px_12px] mb-3">
          <div className="text-[13px] font-bold text-[#111113] mb-1 truncate">
            {kpi.name}
          </div>

          <div className="text-[11px] text-[#8e8e97]">{kpi.desc}</div>

          <div className="text-[11px] text-[#8e8e97] mt-[2px]">
            {kpi.valFmt}
            {kpi.unit} · Jul 2026
          </div>
        </div>

        {/* Widget Type */}
        <div className="mb-[18px]">
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#8e8e97]
              mb-2
            "
          >
            Widget Type
          </span>

          <div className="grid grid-cols-2 gap-[5px]">
            {WIDGET_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onTypeChange(type.id)}
                className={`
                  p-[8px_6px]
                  border-[1.5px]
                  rounded-[8px]
                  bg-[#f7f7f8]
                  text-[#4a4a52]
                  flex
                  flex-col
                  items-center
                  gap-[3px]
                  text-[11px]
                  font-medium
                  transition-all
                  ${
                    widget.type === type.id
                      ? "border-[#E20074] bg-[rgba(226,0,116,0.09)] text-[#E20074]"
                      : "border-black/[0.08] hover:border-black/[0.13] hover:bg-white"
                  }
                `}
              >
                <span className="text-[16px]">{type.icon}</span>

                <span className="text-[11px] font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pocket Size */}
        <div className="mb-[18px]">
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#8e8e97]
              mb-2
            "
          >
            Pocket Size
          </span>

          <div className="flex gap-[5px]">
            {SIZE_DEFS.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => onSizeChange(size.id)}
                className={`
                  flex-1
                  py-[7px]
                  border-[1.5px]
                  rounded-[7px]
                  bg-[#f7f7f8]
                  text-[#4a4a52]
                  text-[12px]
                  font-bold
                  transition-all
                  ${
                    widget.size === size.id
                      ? "border-[#E20074] bg-[rgba(226,0,116,0.09)] text-[#E20074]"
                      : "border-black/[0.08] hover:border-black/[0.13]"
                  }
                `}
              >
                {size.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Drill Down */}
        <button
          type="button"
          onClick={onDrilldown}
          className="
            w-full
            py-[9px]
            border-[1.5px]
            border-black/[0.08]
            rounded-[7px]
            bg-[#f7f7f8]
            text-[#4a4a52]
            text-[12px]
            font-semibold
            transition-all
            mb-2
            hover:border-[#E20074]
            hover:text-[#E20074]
            hover:bg-[rgba(226,0,116,0.09)]
          "
        >
          🔍 Drill Down
        </button>

        {/* Remove */}
        <button
          type="button"
          onClick={onRemove}
          className="
            w-full
            py-[9px]
            border-[1.5px]
            border-[rgba(227,73,72,0.10)]
            rounded-[7px]
            bg-transparent
            text-[#e34948]
            text-[12px]
            font-semibold
            transition-all
            hover:bg-[rgba(227,73,72,0.10)]
          "
        >
          Remove Widget
        </button>
      </div>
    </aside>
  );
}

export default ConfigPanel;
