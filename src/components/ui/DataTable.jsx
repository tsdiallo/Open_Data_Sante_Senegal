export default function DataTable({ columns, rows, emptyLabel = 'Aucun résultat.' }) {
  if (!rows.length) {
    return <p className="text-sm text-slate-500 py-6 text-center">{emptyLabel}</p>
  }
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
            {columns.map((c) => (
              <th key={c.key} className="px-5 py-2 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.id ?? i}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
            >
              {columns.map((c) => (
                <td key={c.key} className="px-5 py-2 text-slate-700">
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
