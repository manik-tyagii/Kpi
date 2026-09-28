import { useEffect, useState } from "react";
import { CATALOG } from "../data/catalog";
import { getKpiById } from "../utils/helpers";

export function useDashboard() {
  const [dashboardName, setDashboardName] = useState("My Dashboard");
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState("add");
  const [multiSel, setMultiSel] = useState([]);
  const [search, setSearch] = useState("");

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pendingKpiId, setPendingKpiId] = useState(null);

  const [drilldownKpi, setDrilldownKpi] = useState(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    if (!toast.visible) return;

    const timer = setTimeout(() => {
      setToast({
        visible: false,
        message: "",
      });
    }, 2400);

    return () => clearTimeout(timer);
  }, [toast.visible]);

  const showToast = (message) => {
    setToast({
      visible: true,
      message,
    });
  };

  const handleKpiClick = (kpiId) => {
    setPendingKpiId(kpiId);
    setAddModalOpen(true);
  };

  const handleAddWidget = (type, size) => {
    if (!pendingKpiId) return;

    const newWidget = {
      id: `w${Date.now()}`,
      kpiId: pendingKpiId,
      type,
      size,
    };

    setWidgets((prev) => [...prev, newWidget]);

    const kpi = getKpiById(pendingKpiId);

    setAddModalOpen(false);
    setPendingKpiId(null);

    showToast(`${kpi?.name || "KPI"} added`);
  };

  const handleRemoveWidget = (id) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));

    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }

    showToast("Widget removed");
  };

  const handleClearAll = () => {
    setWidgets([]);
    setSelectedWidgetId(null);
    showToast("Dashboard cleared");
  };

  const handleSizeChange = (id, size) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              size,
            }
          : widget,
      ),
    );
  };

  const handleTypeChange = (id, type) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id
          ? {
              ...widget,
              type,
            }
          : widget,
      ),
    );
  };

  const handleDrilldown = (id) => {
    const widget = widgets.find((item) => item.id === id);

    if (!widget) {
      console.log("Widget not found:", id);
      return;
    }

    const kpi = getKpiById(widget.kpiId);

    if (!kpi) {
      console.log("KPI not found:", widget.kpiId);
      return;
    }

    setDrilldownKpi(kpi);
  };

  const handleQuickStart = (categoryId) => {
    const kpis = CATALOG[categoryId]?.kpis || [];

    const plan = [
      {
        index: 0,
        type: "line",
        size: "l3",
      },
      {
        index: 1,
        type: "stat",
        size: "l1",
      },
      {
        index: 2,
        type: "bar",
        size: "l2",
      },
      {
        index: 3,
        type: "stat",
        size: "l1",
      },
    ];

    const newWidgets = plan
      .filter((item) => kpis[item.index])
      .map((item, index) => ({
        id: `w${Date.now()}-${index}`,
        kpiId: kpis[item.index].id,
        type: item.type,
        size: item.size,
      }));

    setWidgets((prev) => [...prev, ...newWidgets]);

    showToast(`${categoryId} dashboard generated`);
  };

  const handleCompare = () => {
    if (multiSel.length < 2) return;

    const compareWidget = {
      id: `w${Date.now()}`,
      kpiId: multiSel[0],
      type: "compare",
      size: "l3",
      compareIds: [...multiSel],
    };

    setWidgets((prev) => [...prev, compareWidget]);
    setMultiSel([]);
    setMode("add");

    showToast(`Comparison of ${multiSel.length} KPIs added`);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setPendingKpiId(null);
  };

  const closeDrilldownModal = () => {
    setDrilldownKpi(null);
  };

  const closeConfigPanel = () => {
    setSelectedWidgetId(null);
  };

  const selectedWidget =
    widgets.find((widget) => widget.id === selectedWidgetId) || null;

  return {
    dashboardName,
    setDashboardName,
    widgets,
    selectedWidgetId,
    setSelectedWidgetId,
    selectedWidget,
    sidebarOpen,
    setSidebarOpen,
    mode,
    setMode,
    multiSel,
    setMultiSel,
    search,
    setSearch,
    addModalOpen,
    pendingKpiId,
    drilldownKpi,
    toast,
    showToast,
    handleKpiClick,
    handleAddWidget,
    handleRemoveWidget,
    handleClearAll,
    handleSizeChange,
    handleTypeChange,
    handleDrilldown,
    handleQuickStart,
    handleCompare,
    closeAddModal,
    closeDrilldownModal,
    closeConfigPanel,
  };
}

export default useDashboard;
