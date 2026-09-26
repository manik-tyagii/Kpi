import { useState } from "react";
import { CATALOG } from "../data/catalog";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  mode,
  setMode,
  multiSel,
  setMultiSel,
  search,
  setSearch,
  onKpiClick,
  onCompare,
}) {
  const [openCategories, setOpenCategories] = useState({
    network: true,
    customer: true,
    financial: true,
    usage: true,
  });

  const selectedKpis = Array.isArray(multiSel) ? multiSel : [];

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleKpiClick = (kpiId) => {
    if (mode === "compare") {
      setMultiSel((prev) => {
        const current = Array.isArray(prev) ? prev : [];

        if (current.includes(kpiId)) {
          return current.filter((id) => id !== kpiId);
        }

        if (current.length >= 4) {
          alert("You can compare maximum 4 KPIs.");
          return current;
        }

        return [...current, kpiId];
      });

      return;
    }

    onKpiClick(kpiId);
  };

  const filteredCategories = Object.entries(CATALOG)
    .map(([categoryId, category]) => {
      const filteredKpis = category.kpis.filter((kpi) =>
        kpi?.name?.toLowerCase().includes(search.toLowerCase()),
      );

      return {
        categoryId,
        ...category,
        kpis: filteredKpis,
      };
    })
    .filter((category) => category.kpis.length > 0);

  return (
    <aside
      id="sidebar"
      className={`
        left-0
        top-0
        bottom-0
        z-50

        shrink-0

        bg-[#110a10]
        text-white

        flex
        flex-col
        overflow-hidden

        border-r
        border-white/[0.06]

        transition-[width,min-width]
        duration-[220ms]
        ease-[cubic-bezier(.4,0,.2,1)]

        ${sidebarOpen ? "w-[268px] min-w-[268px]" : "w-[56px] min-w-[56px]"}
      `}
    >
      {/* HEADER */}
      <div
        className="
          px-[14px]
          pt-4
          pb-3

          border-b
          border-white/[0.06]

          flex
          items-center
          gap-[10px]

          shrink-0
        "
      >
        {/* Logo */}
        <div
          className="
            w-[30px]
            h-[30px]
            rounded-[8px]
            bg-[#E20074]

            flex
            items-center
            justify-center

            text-[14px]
            font-black
            text-white

            shrink-0
          "
        >
          K
        </div>

        {/* Brand */}
        <div
          className={`
            flex-1
            min-w-0
            overflow-hidden
            transition-opacity
            duration-[220ms]

            ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <h2 className="text-[13px] font-bold text-white whitespace-nowrap overflow-hidden text-ellipsis">
            KPI Library
          </h2>

          <p className="text-[11px] text-white/[0.35] whitespace-nowrap">
            Select to build
          </p>
        </div>

        {/* Collapse */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse" : "Expand"}
          className="
            w-6
            h-6
            shrink-0

            border-none
            bg-white/[0.06]
            rounded-[6px]

            text-[12px]
            text-white/[0.4]

            flex
            items-center
            justify-center

            transition-colors
            duration-[220ms]

            hover:bg-white/[0.12]
            hover:text-white
          "
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* SIDEBAR BODY */}
      <div
        className={`
          flex-1
          min-h-0
          overflow-y-auto
          overflow-x-hidden

          px-[10px]
          py-3

          transition-opacity
          duration-[220ms]

          [scrollbar-width:thin]
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-thumb]:bg-white/[0.10]
          [&::-webkit-scrollbar-thumb]:rounded-[2px]

          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* SEARCH */}
        <div className="relative mb-3">
          <span
            className="
              absolute
              left-[9px]
              top-1/2
              -translate-y-1/2

              text-[13px]
              text-white/[0.3]

              pointer-events-none
            "
          >
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search KPIs…"
            className="
              w-full

              px-[10px]
              py-2
              pl-8

              bg-white/[0.07]
              border
              border-white/[0.08]

              rounded-[8px]

              text-[12px]
              text-white

              placeholder:text-white/[0.3]

              outline-none

              transition-all
              duration-[220ms]

              focus:bg-white/[0.10]
              focus:border-[#E20074]
            "
          />
        </div>

        {/* MODE BAR */}
        <div className="flex gap-1 mb-[14px]">
          <button
            type="button"
            onClick={() => {
              setMode("add");
              setMultiSel([]);
            }}
            className={`
              flex-1
              px-0
              py-[6px]

              border-none
              rounded-[6px]

              text-[11px]
              font-semibold

              transition-all
              duration-[220ms]

              ${
                mode === "add"
                  ? "bg-[#E20074] text-white"
                  : "bg-white/[0.06] text-white/[0.4] hover:text-white"
              }
            `}
          >
            + Add
          </button>

          <button
            type="button"
            onClick={() => setMode("compare")}
            className={`
              flex-1
              px-0
              py-[6px]

              border-none
              rounded-[6px]

              text-[11px]
              font-semibold

              transition-all
              duration-[220ms]

              ${
                mode === "compare"
                  ? "bg-[#E20074] text-white"
                  : "bg-white/[0.06] text-white/[0.4] hover:text-white"
              }
            `}
          >
            Compare
          </button>
        </div>

        {/* KPI CATALOG */}
        {mode === "goals" ? (
          <div className="py-10 text-center text-white/[0.4]">
            <div className="text-3xl">🎯</div>

            <div className="text-[13px] font-bold text-white mt-3">
              Objectives
            </div>

            <div className="text-[11px] mt-1">
              Objectives will be added here.
            </div>
          </div>
        ) : (
          <>
            {filteredCategories.map((category) => {
              const isOpen = openCategories[category.categoryId];

              return (
                <div key={category.categoryId} className="mb-[6px]">
                  {/* CATEGORY HEADER */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.categoryId)}
                    className="
                      w-full

                      flex
                      items-center
                      gap-[6px]

                      px-2
                      py-[6px]

                      border-none
                      rounded-[7px]

                      bg-transparent

                      cursor-pointer
                      text-left

                      transition-colors
                      duration-[220ms]

                      hover:bg-white/[0.06]
                    "
                  >
                    <span className="text-[13px] shrink-0">
                      {category.icon}
                    </span>

                    <span
                      className="
                        flex-1
                        text-[11px]
                        font-bold

                        uppercase
                        tracking-[0.07em]

                        text-white/[0.45]
                      "
                    >
                      {category.label}
                    </span>

                    <span className="text-[10px] font-semibold text-white/[0.25]">
                      {category.kpis.length}
                    </span>

                    <span
                      className={`
                        text-[9px]
                        text-white/[0.25]

                        transition-transform
                        duration-[220ms]

                        ${isOpen ? "rotate-90" : "rotate-0"}
                      `}
                    >
                      ▶
                    </span>
                  </button>

                  {/* KPI ITEMS */}
                  {isOpen && (
                    <div className="pl-1">
                      {category.kpis.map((kpi) => {
                        const selected = selectedKpis.includes(kpi.id);

                        return (
                          <button
                            key={kpi.id}
                            type="button"
                            onClick={() => handleKpiClick(kpi.id)}
                            className={`
                              w-full

                              flex
                              items-center
                              gap-2

                              px-2
                              py-[7px]

                              border-none
                              rounded-[7px]

                              bg-transparent

                              cursor-pointer
                              text-left

                              relative

                              mb-px

                              transition-colors
                              duration-[220ms]

                              ${
                                selected
                                  ? "bg-[rgba(226,0,116,0.10)]"
                                  : "hover:bg-white/[0.07]"
                              }
                            `}
                          >
                            {/* KPI DOT */}
                            <span
                              className="
                                w-[7px]
                                h-[7px]

                                rounded-full
                                shrink-0
                              "
                              style={{
                                backgroundColor: kpi.color || "#E20074",
                              }}
                            />

                            {/* KPI NAME */}
                            <span
                              className="
                                flex-1

                                text-[12px]
                                text-white/[0.75]

                                whitespace-nowrap
                                overflow-hidden
                                text-ellipsis
                              "
                            >
                              {kpi.name}
                            </span>

                            {/* KPI VALUE */}
                            <span
                              className="
                                text-[11px]
                                text-white/[0.35]

                                whitespace-nowrap
                              "
                            >
                              {kpi.valFmt}
                              {kpi.unit}
                            </span>

                            {/* COMPARE CHECK */}
                            {mode === "compare" && (
                              <span
                                className={`
                                  w-[18px]
                                  h-[18px]

                                  shrink-0

                                  rounded-[5px]

                                  border

                                  flex
                                  items-center
                                  justify-center

                                  text-[11px]
                                  font-bold

                                  transition-all

                                  ${
                                    selected
                                      ? "bg-[#E20074] border-[#E20074] text-white"
                                      : "bg-transparent border-white/[0.25] text-transparent"
                                  }
                                `}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* NO SEARCH RESULT */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-10 text-[11px] text-white/[0.4]">
                No KPIs found
              </div>
            )}
          </>
        )}
      </div>

      {/* COMPARE FOOTER */}
      {mode === "compare" && (
        <div
          className={`
            shrink-0

            border-t
            border-white/[0.06]

            bg-[#110a10]

            p-[10px]

            transition-opacity
            duration-[220ms]

            ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-white/[0.4]">
              Select KPIs to compare
            </span>

            <span className="text-[10px] font-bold text-white">
              {selectedKpis.length}/4
            </span>
          </div>

          <button
            type="button"
            disabled={selectedKpis.length < 2}
            onClick={onCompare}
            className={`
              w-full

              px-0
              py-[7px]

              border-none
              rounded-[6px]

              text-[11px]
              font-semibold

              transition-all
              duration-[220ms]

              ${
                selectedKpis.length >= 2
                  ? "bg-[#E20074] text-white hover:bg-[#c90068]"
                  : "bg-white/[0.06] text-white/[0.25] cursor-not-allowed"
              }
            `}
          >
            {selectedKpis.length >= 2
              ? `Compare ${selectedKpis.length} KPIs`
              : "Select at least 2 KPIs"}
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
