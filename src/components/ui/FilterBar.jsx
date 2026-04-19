export default function FilterBar({ filters, children }) {
  return (
    <div className="card flex flex-wrap items-end gap-4">
      {filters.map((f) => (
        <label key={f.id} className="flex flex-col text-xs text-slate-500 min-w-[160px]">
          <span className="mb-1 font-medium uppercase tracking-wide">{f.label}</span>
          <select
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      {children}
    </div>
  )
}
