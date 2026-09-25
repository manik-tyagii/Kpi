export const WIDGET_TYPES = [
  {
    id: "stat",
    name: "Stat Tile",
    icon: "🔢",
    desc: "Number + delta",
  },
  {
    id: "line",
    name: "Line Chart",
    icon: "📈",
    desc: "Trend over time",
  },
  {
    id: "bar",
    name: "Bar Chart",
    icon: "📊",
    desc: "Period comparison",
  },
  {
    id: "area",
    name: "Area Chart",
    icon: "📉",
    desc: "Volume & trend",
  },
  {
    id: "donut",
    name: "Donut",
    icon: "🍩",
    desc: "Part-to-whole",
  },
  {
    id: "gauge",
    name: "Gauge",
    icon: "⏱",
    desc: "Goal progress",
  },
  {
    id: "table",
    name: "Data Table",
    icon: "📋",
    desc: "Row-level detail",
  },
  {
    id: "compare",
    name: "Multi-KPI",
    icon: "⚡",
    desc: "Side-by-side trend",
  },
];

export const SIZE_DEFS = [
  {
    id: "l1",
    label: "L1 — Small",
    sub: "Stat only",
    cols: 3,
  },
  {
    id: "l2",
    label: "L2 — Medium",
    sub: "Stat + mini chart",
    cols: 6,
  },
  {
    id: "l3",
    label: "L3 — Full",
    sub: "Full chart + axes",
    cols: 12,
  },
];
