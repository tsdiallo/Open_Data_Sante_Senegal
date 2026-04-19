export default function DataTable({ columns, rows, emptyLabel = 'Aucun résultat.' }) {
  if (!rows.length) {
    return <p className="text-sm text-ink-500 py-6 text-center">{emptyLabel}</p>
  }
  return (
    <div className="overflow-x-auto -mx-6">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-ink-500 border-b border-ink-900/10">
            {columns.map((c) => (
              <th key={c.key} className="px-6 py-3 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id ?? i}
              className="border-b border-ink-900/5 last:border-0 hover:bg-sand/60 transition-colors"
            >
              {columns.map((c) => (
                <td key={c.key} className="px-6 py-3 text-ink-700">
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
