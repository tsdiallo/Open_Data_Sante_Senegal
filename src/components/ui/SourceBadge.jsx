import { formatDate } from '../../utils/format.js'

export default function SourceBadge({ source, maj }) {
  if (!source) return null
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 max-w-xs truncate">
      <span className="font-medium text-slate-600">Source</span>
      <span className="truncate">: {source}</span>
      {maj && <span className="hidden sm:inline">— MAJ {formatDate(maj)}</span>}
    </span>
  )
}
