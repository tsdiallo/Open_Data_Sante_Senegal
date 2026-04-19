import { useState } from 'react'

export default function InfoTooltip({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-500 text-xs font-semibold hover:bg-slate-200"
        aria-label="Plus d'infos"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        i
      </button>
      {open && (
        <span className="absolute z-10 left-6 top-0 w-64 p-2 rounded-md bg-slate-900 text-white text-xs shadow-lg">
          {text}
        </span>
      )}
    </span>
  )
}
