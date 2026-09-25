import WidgetCard from "./WidgetCard";

function WidgetGrid({
  widgets,
  selectedWidget,
  onSelectWidget,
  onRemoveWidget,
  onSizeChange,
  onDrilldown,
}) {
  if (!widgets.length) {
    return null;
  }

  return (
    <div
      id="widget-grid"
      className="
        grid
        grid-cols-12
        gap-[14px]
        items-start
      "
    >
      {widgets.map((widget) => (
        <WidgetCard
          key={widget.id}
          widget={widget}
          selected={selectedWidget === widget.id}
          onSelect={() => onSelectWidget(widget.id)}
          onRemove={() => onRemoveWidget(widget.id)}
          onSizeChange={(size) => onSizeChange(widget.id, size)}
          onDrilldown={() => onDrilldown(widget.id)}
        />
      ))}
    </div>
  );
}

export default WidgetGrid;
