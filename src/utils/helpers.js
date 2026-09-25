import { CATALOG } from "../data/catalog";

export function getKpiById(id) {
  for (const category of Object.values(CATALOG)) {
    const kpi = category.kpis.find((item) => item.id === id);

    if (kpi) {
      return kpi;
    }
  }

  return null;
}

export function formatDelta(kpi) {
  const sign = kpi.delta >= 0 ? "+" : "";

  return `${sign}${kpi.delta} (${sign}${kpi.deltaPct}%)`;
}

export function getDeltaClass(kpi) {
  if (kpi.dir === "up") {
    return "pos";
  }

  return "neg";
}

export function getDeltaArrow(kpi) {
  return kpi.delta >= 0 ? "▲" : "▼";
}
