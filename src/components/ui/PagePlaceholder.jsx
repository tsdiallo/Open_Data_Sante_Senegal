export default function PagePlaceholder({ eyebrow, title, description, phase }) {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display text-4xl text-ink-900">{title}</h1>
        {description && (
          <p className="text-ink-700 max-w-2xl leading-relaxed">{description}</p>
        )}
      </header>
      <div className="card border-dashed border-ink-900/10 bg-sand/60 text-sm text-ink-500">
        <p className="font-medium text-ink-700 mb-1">Module en construction</p>
        <p>
          Implémentation prévue en <span className="text-brand-700 font-medium">{phase}</span>.
          Voir <code className="px-1.5 py-0.5 bg-ink-900/5 rounded text-xs font-mono">SPEC.md</code> pour le détail fonctionnel.
        </p>
      </div>
    </div>
  )
}
