const TONES = {
  brand: 'before:bg-brand-500',
  sun: 'before:bg-sun-500',
  clinic: 'before:bg-clinic-500',
  neutral: 'before:bg-ink-900/20',
}

export default function KpiCard({ label, value, hint, tone = 'brand' }) {
  return (
    <div
      className={`card relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-6 before:w-8 before:h-[3px] before:rounded-b ${TONES[tone] ?? TONES.brand}`}
    >
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-display font-semibold text-3xl text-ink-900 tracking-tightish">
        {value}
      </p>
      {hint && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
    </div>
  )
}
