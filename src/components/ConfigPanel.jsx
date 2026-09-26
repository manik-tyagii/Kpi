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
        border-(--border)
        flex
        flex-col
        shrink-0
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          px-3.5
          pt-3.5
          pb-2.5
          border-b
          border-(--border)
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
            bg-(--surface-2)
            rounded-md
            text-(--ink-3)
            text-[14px]
            flex
            items-center
            justify-center
            transition-all
            hover:bg-(--neg-wash)
            hover:text-(--neg)
          "
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5">
        <div className="bg-[#f7f7f8] rounded-lg p-[10px_12px] mb-3">
          <div className="text-[13px] font-bold text-(--ink) mb-1 truncate">
            {kpi.name}
          </div>

          <div className="text-[11px] text-(--ink-3)">{kpi.desc}</div>

          <div className="text-[11px] text-(--ink-3) mt-0.5">
            {kpi.valFmt}
            {kpi.unit} · Jul 2026
          </div>
        </div>

        {/* Widget Type */}
        <div className="mb-4.5">
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-(--ink-3)
              mb-2
            "
          >
            Widget Type
          </span>

          <div className="grid grid-cols-2 gap-1.25">
            {WIDGET_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onTypeChange(type.id)}
                className={`
                  p-[8px_6px]
                  border-[1.5px]
                  rounded-lg
                  bg-(--surface-2)
                  text-(--ink-2)
                  flex
                  flex-col
                  items-center
                  gap-0.75
                  text-[11px]
                  font-medium
                  transition-all
                  ${
                    widget.type === type.id
                      ? "border-(--brand) bg-(--brand-wash) text-(--brand)"
                      : "border-(--border) hover:border-(--border) hover:bg-white"
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
        <div className="mb-4.5">
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-(--ink-3)
              mb-2
            "
          >
            Pocket Size
          </span>

          <div className="flex gap-1.25">
            {SIZE_DEFS.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => onSizeChange(size.id)}
                className={`
                  flex-1
                  py-1.75
                  border-[1.5px]
                  rounded-[7px]
                  bg-(--surface-2)
                  text-(--ink-2)
                  text-[12px]
                  font-bold
                  transition-all
                  ${
                    widget.size === size.id
                      ? "border-(--brand) bg-(--brand-wash) text-(--brand)"
                      : "border-(--border) hover:border-(--border)"
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
            py-2.5
            border-[1.5px]
            border-(--border)
            rounded-[7px]
            bg-(--surface-2)
            text-(--ink-2)
            text-[12px]
            font-semibold
            transition-all
            mb-2
            hover:border-(--brand)
            hover:text-(--brand)
            hover:bg-(--brand-wash)
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
            py-2.25
            border-[1.5px]
            border-(--neg-wash)
            rounded-[7px]
            bg-transparent
            text-(--neg)
            text-[12px]
            font-semibold
            transition-all
            hover:bg-(--neg-wash)
          "
        >
          Remove Widget
        </button>
      </div>
    </aside>
  );
}

export default ConfigPanel;
