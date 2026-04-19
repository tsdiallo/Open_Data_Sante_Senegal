export default function CodeBlock({ title, code }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-slate-800 text-xs font-mono text-slate-300">
          {title}
        </div>
      )}
      <pre className="px-4 py-3 text-xs leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
