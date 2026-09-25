import { useState } from "react";

import { WIDGET_TYPES, SIZE_DEFS } from "../data/widgetTypes";

import {
  getKpiById,
  formatDelta,
  getDeltaClass,
  getDeltaArrow,
} from "../utils/helpers";

function AddWidgetModal({ isOpen, kpiId, onClose, onConfirm }) {
  const [selectedType, setSelectedType] = useState("line");
  const [selectedSize, setSelectedSize] = useState("l2");

  if (!isOpen) {
    return null;
  }

  const kpi = getKpiById(kpiId);

  if (!kpi) {
    return null;
  }

  const deltaClass =
    getDeltaClass(kpi) === "pos"
      ? "text-[#1baf7a] bg-[rgba(27,175,122,0.10)]"
      : "text-[#e34948] bg-[rgba(227,73,72,0.10)]";

  return (
    <div className="fixed inset-0 z-[100] flex items-end pointer-events-auto opacity-100">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.45)] backdrop-blur-[3px]"
        onClick={onClose}
      />

      {/* Modal Sheet */}
      <div className="relative z-10 w-full bg-white rounded-t-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.14),0_24px_64px_rgba(0,0,0,0.14)] max-h-[90vh] overflow-y-auto">
        {/* Drag Handle */}
        <div className="w-10 h-1 rounded-[2px] bg-[rgba(0,0,0,0.13)] mx-auto mt-[10px]" />

        {/* Modal Inner */}
        <div className="px-6 pt-4 pb-7">
          {/* KPI Header */}
          <div className="flex items-start gap-3 mb-5">
            {/* KPI Icon */}
            <div className="w-11 h-11 rounded-[10px] flex-shrink-0 flex items-center justify-center text-xl bg-[rgba(226,0,116,0.09)]">
              📡
            </div>

            {/* KPI Info */}
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#111113]">{kpi.name}</h2>

              <p className="text-xs text-[#8e8e97] mt-[2px]">{kpi.desc}</p>
            </div>

            {/* KPI Stat */}
            <div className="ml-auto text-right flex-shrink-0">
              <div className="text-[22px] font-bold text-[#111113]">
                {kpi.unit === "$" ? "$" : ""}
                {kpi.valFmt}
                {kpi.unit !== "$" && kpi.unit}
              </div>

              <span
                className={`inline-flex items-center gap-[3px] text-[11px] font-bold px-[7px] py-[2px] rounded-[20px] ${deltaClass}`}
              >
                {getDeltaArrow(kpi)} {formatDelta(kpi)}
              </span>
            </div>
          </div>

          {/* Visualization Label */}
          <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#8e8e97] mb-[10px]">
            Choose a visualization type
          </span>

          {/* Visualization Types */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {WIDGET_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-3 px-2 border-[1.5px] rounded-[10px] bg-[#f7f7f8] cursor-pointer flex flex-col items-center gap-1 transition-all ${
                  selectedType === type.id
                    ? "border-[#E20074] bg-[rgba(226,0,116,0.09)] shadow-[0_0_0_3px_rgba(226,0,116,0.16)]"
                    : "border-[rgba(0,0,0,0.08)]"
                }`}
              >
                <span className="text-[22px]">{type.icon}</span>

                <span
                  className={`text-[11px] font-semibold ${
                    selectedType === type.id
                      ? "text-[#E20074]"
                      : "text-[#4a4a52]"
                  }`}
                >
                  {type.name}
                </span>

                <span className="text-[10px] text-[#8e8e97] text-center">
                  {type.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Size Label */}
          <span className="block text-[11px] font-bold uppercase tracking-[0.08em] text-[#8e8e97] mb-[10px]">
            Choose a pocket size
          </span>

          {/* Size Picker */}
          <div className="grid grid-cols-3 gap-2 mb-[22px]">
            {SIZE_DEFS.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size.id)}
                className={`border-[1.5px] rounded-[10px] bg-[#f7f7f8] cursor-pointer p-[10px] transition-all flex flex-col gap-[5px] ${
                  selectedSize === size.id
                    ? "border-[#E20074] bg-[rgba(226,0,116,0.09)] shadow-[0_0_0_3px_rgba(226,0,116,0.16)]"
                    : "border-[rgba(0,0,0,0.08)]"
                }`}
              >
                {/* 12-column preview */}
                <div className="grid grid-cols-12 gap-[1.5px] h-5">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-full rounded-[2px] ${
                        index < size.cols
                          ? "bg-[#E20074]"
                          : "bg-[#E20074] opacity-25"
                      }`}
                    />
                  ))}
                </div>

                <div
                  className={`text-[11px] font-bold ${
                    selectedSize === size.id
                      ? "text-[#E20074]"
                      : "text-[#4a4a52]"
                  }`}
                >
                  {size.label}
                </div>

                <div className="text-[10px] text-[#8e8e97]">{size.sub}</div>
              </button>
            ))}
          </div>

          {/* Modal Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-none px-5 py-[10px] border-[1.5px] border-[rgba(0,0,0,0.08)] rounded-lg bg-transparent text-[#4a4a52] text-[13px] font-semibold transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => onConfirm(selectedType, selectedSize)}
              className="flex-1 py-[11px] rounded-lg border-none bg-[#E20074] text-white text-[13px] font-bold transition-colors"
            >
              Add to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
