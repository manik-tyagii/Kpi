import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import EmptyState from "./components/EmptyState";
import WidgetGrid from "./components/WidgetGrid";
import ConfigPanel from "./components/ConfigPanel";
import AddWidgetModal from "./components/AddWidgetModal";
import DrilldownModal from "./components/DrilldownModal";
import Toast from "./components/Toast";
import { useDashboard } from "./hooks/useDashboard";

function App() {
  const {
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
  } = useDashboard();

  return (
    <div className="h-screen overflow-hidden bg-[#f0f0f2]">
      <div className="flex h-full">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          mode={mode}
          setMode={setMode}
          multiSel={multiSel}
          setMultiSel={setMultiSel}
          search={search}
          setSearch={setSearch}
          onKpiClick={handleKpiClick}
          onCompare={handleCompare}
        />

        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              fixed left-3 top-3 z-200
              w-9 h-9
              rounded-lg
              bg-[#E20074] text-white
              shadow-lg
              flex items-center justify-center
              font-bold
            "
            title="Show sidebar"
          >
            ♟
          </button>
        )}

        <main className="flex-1 min-w-0 flex flex-col">
          <Navbar
            dashboardName={dashboardName}
            setDashboardName={setDashboardName}
            onClearAll={handleClearAll}
          />

          <div
            id="canvas"
            className="
              flex-1
              overflow-y-auto
              overflow-x-hidden
              px-5
              pt-4.5
              pb-10
              relative
            "
          >
            {widgets.length === 0 ? (
              <EmptyState onQuickStart={handleQuickStart} />
            ) : (
              <WidgetGrid
                widgets={widgets}
                selectedWidget={selectedWidgetId}
                onSelectWidget={setSelectedWidgetId}
                onRemoveWidget={handleRemoveWidget}
                onSizeChange={handleSizeChange}
                onDrilldown={handleDrilldown}
              />
            )}
          </div>
        </main>

        {selectedWidget && (
          <ConfigPanel
            widget={selectedWidget}
            onClose={closeConfigPanel}
            onTypeChange={(type) => handleTypeChange(selectedWidget.id, type)}
            onSizeChange={(size) => handleSizeChange(selectedWidget.id, size)}
            onDrilldown={() => handleDrilldown(selectedWidget.id)}
            onRemove={() => handleRemoveWidget(selectedWidget.id)}
          />
        )}
      </div>

      <AddWidgetModal
        isOpen={addModalOpen}
        kpiId={pendingKpiId}
        onClose={closeAddModal}
        onConfirm={handleAddWidget}
      />

      <DrilldownModal
        kpi={drilldownKpi}
        onClose={closeDrilldownModal}
      />

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default App;
