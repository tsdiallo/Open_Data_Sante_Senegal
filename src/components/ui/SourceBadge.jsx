import { formatDate } from '../../utils/format.js'

export default function SourceBadge({ source, maj }) {
  if (!source) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-500 bg-sand border border-ink-900/5 rounded-full px-2.5 py-1 max-w-xs truncate">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden />
      <span className="truncate">{source}</span>
      {maj && <span className="hidden sm:inline text-ink-500/70">· MAJ {formatDate(maj)}</span>}
    </span>
  )
}
