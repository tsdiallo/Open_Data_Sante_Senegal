export default function CodeBlock({ title, code }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-ink-900 text-slate-100 overflow-hidden shadow-card">
      {title && (
        <div className="px-4 py-2.5 bg-ink-900/60 border-b border-white/5 text-xs font-mono text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400" aria-hidden />
          {title}
        </div>
      )}
      <pre className="px-4 py-4 text-xs leading-relaxed overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}
