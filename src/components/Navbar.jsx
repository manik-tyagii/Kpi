import NavButton from "./NavButton";
import "./variable.css";

function Navbar({ dashboardName, setDashboardName, onClearAll }) {
  return (
    <header
      className="
        h-13
        shrink-0
        bg-(--surface)
        border-b border-(--border)
        flex
        items-center
        gap-2.5
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
            text-(--ink)
            border-transparent
            bg-transparent
            outline-none
            min-w-20
            border-b
            focus:border-b-2
            focus:border-b-[var(--brand)]
          "
        />

        {/* LIVE Badge */}
        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.06em]
            bg-(--brand-wash)
            text-(--brand)
            px-2
            py-0.5
            rounded-[20px]
          "
        >
          Live
        </span>
      </div>

      <span className="flex-1" />

      {/* Location */}
      <div
        className="
          flex
          items-center
          gap-1.5
          bg-(--surface-2)
          border
          border-(--border-2)
           hover:border-[var(--brand)]
          rounded-lg
          px-2.5
          py-1.25
          text-[12px]
          text-(--ink)
          font-medium
          cursor-pointer
         transition-[border-color]
        duration:var(--trans)

        "
      >
        <span className="text-(--ink-3)">Location:</span>
        <span>National</span>
        <span className="text-(--ink-3) text-[9px] ml-0.5">▾</span>
      </div>

      {/* Timeline */}
      <div
        className="
          flex
          items-center
          gap-1.5
          bg-(--surface-2)
          border
          border-(--border-2)
           hover:border-[var(--brand)]
          rounded-lg
          px-2.5
          py-1.25
          text-[12px]
          text-(--ink)
          font-medium
          cursor-pointer
         transition-[border-color]
        duration:var(--trans)

        "
      >
        <span className="text-(--ink-3)">Timeline:</span>
        <span>Monthly – Aug'26</span>
        <span className="text-(--ink-3) text-[9px] ml-0.5">▾</span>
      </div>

      {/* Buttons */}
      <NavButton icon={"↓"} title={"Download"} />
      <NavButton icon={"↗"} title={"Share"} />

      {/* Clear All */}
      <button
        type="button"
        onClick={onClearAll}
        className="
          flex
          items-center
          gap-1.25
          bg-(--brand)
          text-white
          border-none
          rounded-lg
          px-3.5
          py-1.5
          text-[12px]
          font-semibold
          hover:bg-(--brand-mid)
          transition-[background-color]
          duration:var(--trans)
        "
      >
        🗑 Clear All
      </button>
    </header>
  );
}

export default Navbar;
