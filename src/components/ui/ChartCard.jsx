import SourceBadge from './SourceBadge.jsx'
import InfoTooltip from './InfoTooltip.jsx'

export default function ChartCard({ title, info, source, maj, children }) {
  return (
    <section className="card">
      <header className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-ink-900/5">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-semibold text-lg text-ink-900">{title}</h2>
          {info && <InfoTooltip text={info} />}
        </div>
        {source && <SourceBadge source={source} maj={maj} />}
      </header>
      <div className="w-full">{children}</div>
    </section>
  )
}
