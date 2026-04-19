import { useState } from 'react'

export default function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-ink-900/5 text-ink-500 text-[11px] font-semibold hover:bg-brand-500/10 hover:text-brand-700 transition"
        aria-label="Plus d'infos"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        i
      </button>
      {open && (
        <span className="absolute z-10 left-6 top-0 w-64 p-3 rounded-lg bg-ink-900 text-white text-xs leading-relaxed shadow-xl">
          {text}
        </span>
      )}
    </span>
  )
}
