export default function FilterBar({ filters, children }) {
  return (
    <div className="card flex flex-wrap items-end gap-4">
      {filters.map((f) => (
        <label key={f.id} className="flex flex-col text-xs min-w-[160px]">
          <span className="eyebrow mb-1.5">{f.label}</span>
          <select
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="border border-ink-900/10 rounded-xl px-3 py-2 text-sm text-ink-900 bg-paper focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/60 transition"
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
