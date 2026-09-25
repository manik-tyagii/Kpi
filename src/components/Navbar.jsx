function Navbar({ dashboardName, setDashboardName, onClearAll }) {
  return (
    <header
      className="
        h-[52px]
        shrink-0
        bg-white
        border-b
        border-black/[0.08]
        flex
        items-center
        gap-[10px]
        px-5
      "
    >
      {/* Dashboard Name */}
      <div className="flex items-center gap-2">
        <input
          value={dashboardName}
          onChange={(event) => setDashboardName(event.target.value)}
          spellCheck={false}
          className="
            text-[15px]
            font-bold
            text-[#111113]
            border-none
            bg-transparent
            outline-none
            min-w-[80px]
          "
        />

        {/* LIVE Badge */}
        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.06em]
            bg-[rgba(226,0,116,0.09)]
            text-[#E20074]
            px-2
            py-[2px]
            rounded-[20px]
          "
        >
          Live
        </span>
      </div>

      <span className="flex-1" />

      {/* Location */}
      <button
        type="button"
        className="
          flex
          items-center
          gap-[5px]
          bg-[#f7f7f8]
          border
          border-black/[0.13]
          rounded-lg
          px-[10px]
          py-[5px]
          text-[12px]
          text-[#111113]
          font-medium
        "
      >
        <span className="text-[#8e8e97]">Location:</span>
        <span>National</span>
        <span className="text-[#8e8e97] text-[9px] ml-[2px]">▾</span>
      </button>

      {/* Timeline */}
      <button
        type="button"
        className="
          flex
          items-center
          gap-[5px]
          bg-[#f7f7f8]
          border
          border-black/[0.13]
          rounded-lg
          px-[10px]
          py-[5px]
          text-[12px]
          text-[#111113]
          font-medium
        "
      >
        <span className="text-[#8e8e97]">Timeline:</span>
        <span>Monthly – Aug'26</span>
        <span className="text-[#8e8e97] text-[9px] ml-[2px]">▾</span>
      </button>

      {/* Download */}
      <button
        type="button"
        title="Download"
        className="
          w-8
          h-8
          border
          border-black/[0.08]
          rounded-lg
          bg-[#f7f7f8]
          text-[#4a4a52]
          flex
          items-center
          justify-center
          text-[14px]
        "
      >
        ↓
      </button>

      {/* Share */}
      <button
        type="button"
        title="Share"
        className="
          w-8
          h-8
          border
          border-black/[0.08]
          rounded-lg
          bg-[#f7f7f8]
          text-[#4a4a52]
          flex
          items-center
          justify-center
          text-[14px]
        "
      >
        ↗
      </button>

      {/* Clear All */}
      <button
        type="button"
        onClick={onClearAll}
        className="
          flex
          items-center
          gap-[5px]
          bg-[#E20074]
          text-white
          border-none
          rounded-lg
          px-[14px]
          py-[6px]
          text-[12px]
          font-semibold
        "
      >
        🗑 Clear All
      </button>
    </header>
  );
}

export default Navbar;
