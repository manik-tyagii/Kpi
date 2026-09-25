function TableWidget({ kpi }) {
  const months = kpi.months || [];
  const values = kpi.data || [];

  const tableData = months
    .map((month, index) => ({
      month,
      value: values[index],
    }))
    .filter((item) => item.value !== undefined);

  if (!tableData.length) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-[#9999a1]">
        No table data available
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-black/[0.08]">
            <th className="text-left py-2 px-2 text-[10px] uppercase tracking-wider text-[#888890]">
              Period
            </th>

            <th className="text-right py-2 px-2 text-[10px] uppercase tracking-wider text-[#888890]">
              Value
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr key={item.month} className="border-b border-black/[0.04]">
              <td className="py-2 px-2 text-xs text-[#55555d]">{item.month}</td>

              <td className="py-2 px-2 text-right text-xs font-semibold text-[#303038]">
                {item.value}
                {kpi.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableWidget;
