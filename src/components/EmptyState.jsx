function EmptyState({ onQuickStart }) {
  return (
    <div
      id="empty-state"
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[calc(100vh-132px)]
        text-center
      "
    >
      {/* Dashboard Preview */}
      <svg
        className="w-[160px] mb-5 opacity-[0.55]"
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* L1 */}
        <rect
          x="10"
          y="20"
          width="55"
          height="55"
          rx="8"
          fill="#E20074"
          opacity="0.15"
        />

        <rect
          x="10"
          y="20"
          width="55"
          height="55"
          rx="8"
          stroke="#E20074"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* L2 */}
        <rect
          x="75"
          y="20"
          width="115"
          height="55"
          rx="8"
          fill="#2a78d6"
          opacity="0.1"
        />

        <rect
          x="75"
          y="20"
          width="115"
          height="55"
          rx="8"
          stroke="#2a78d6"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Bottom Left */}
        <rect
          x="10"
          y="85"
          width="88"
          height="40"
          rx="8"
          fill="#1baf7a"
          opacity="0.1"
        />

        <rect
          x="10"
          y="85"
          width="88"
          height="40"
          rx="8"
          stroke="#1baf7a"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Bottom Right */}
        <rect
          x="108"
          y="85"
          width="82"
          height="40"
          rx="8"
          fill="#eb6834"
          opacity="0.1"
        />

        <rect
          x="108"
          y="85"
          width="82"
          height="40"
          rx="8"
          stroke="#eb6834"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Labels */}
        <text
          x="37"
          y="52"
          textAnchor="middle"
          fontSize="10"
          fill="#E20074"
          opacity="0.7"
          fontWeight="700"
        >
          L1
        </text>

        <text
          x="132"
          y="52"
          textAnchor="middle"
          fontSize="10"
          fill="#2a78d6"
          opacity="0.7"
          fontWeight="700"
        >
          L2
        </text>

        <text
          x="54"
          y="110"
          textAnchor="middle"
          fontSize="10"
          fill="#1baf7a"
          opacity="0.7"
          fontWeight="700"
        >
          L2
        </text>

        <text
          x="149"
          y="110"
          textAnchor="middle"
          fontSize="10"
          fill="#eb6834"
          opacity="0.7"
          fontWeight="700"
        >
          L2
        </text>
      </svg>

      {/* Heading */}
      <h3 className="text-[16px] font-bold text-[#4a4a52] mb-2">
        Build your dashboard
      </h3>

      {/* Description */}
      <p className="text-[13px] text-[#8e8e97] mb-5 max-w-[300px] leading-[1.6]">
        Click any KPI in the sidebar to add a widget, start from a quick
        template below, or switch to <strong>🎯 Goals</strong> to generate a
        dashboard from a business objective.
      </p>

      {/* Quick Start */}
      <div className="flex gap-2 flex-wrap justify-center mt-2">
        <button
          type="button"
          onClick={() => onQuickStart("network")}
          className="
            flex
            items-center
            gap-[6px]
            bg-white
            border
            border-black/[0.08]
            rounded-[20px]
            px-[14px]
            py-[7px]
            text-[12px]
            text-[#4a4a52]
            cursor-pointer
            transition-all
            shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]
            hover:border-[#E20074]
            hover:text-[#E20074]
            hover:bg-[rgba(226,0,116,0.09)]
          "
        >
          📡 Network Overview
        </button>

        <button
          type="button"
          onClick={() => onQuickStart("customer")}
          className="
            flex
            items-center
            gap-[6px]
            bg-white
            border
            border-black/[0.08]
            rounded-[20px]
            px-[14px]
            py-[7px]
            text-[12px]
            text-[#4a4a52]
            cursor-pointer
            transition-all
            shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]
            hover:border-[#E20074]
            hover:text-[#E20074]
            hover:bg-[rgba(226,0,116,0.09)]
          "
        >
          👥 Customer Health
        </button>

        <button
          type="button"
          onClick={() => onQuickStart("financial")}
          className="
            flex
            items-center
            gap-[6px]
            bg-white
            border
            border-black/[0.08]
            rounded-[20px]
            px-[14px]
            py-[7px]
            text-[12px]
            text-[#4a4a52]
            cursor-pointer
            transition-all
            shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]
            hover:border-[#E20074]
            hover:text-[#E20074]
            hover:bg-[rgba(226,0,116,0.09)]
          "
        >
          💰 Financial Summary
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
