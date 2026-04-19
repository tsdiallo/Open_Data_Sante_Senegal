import { useMemo } from 'react'
import rawSample from '../data/raw/epidemio_raw.json'
import { cleanEpidemio } from '../utils/cleaning.js'
import DataTable from './ui/DataTable.jsx'

export default function DataCleaningExamples() {
  const cleaned = useMemo(() => cleanEpidemio(rawSample), [])

  const rawCols = [
    { key: 'region', label: 'region' },
    { key: 'maladie', label: 'maladie' },
    { key: 'annee', label: 'annee' },
    { key: 'semaine', label: 'semaine' },
    { key: 'cas', label: 'cas' },
    { key: 'deces', label: 'deces' },
  ]

  const cleanedCols = [
    { key: 'region_code', label: 'region_code', render: (r) => <span className="font-medium text-brand-700">{r.region_code}</span> },
    { key: 'maladie', label: 'maladie' },
    { key: 'annee', label: 'annee' },
    { key: 'semaine', label: 'semaine' },
    { key: 'cas', label: 'cas', render: (r) => (r.cas === null ? <span className="text-ink-500/60">—</span> : r.cas) },
    { key: 'deces', label: 'deces', render: (r) => (r.deces === null ? <span className="text-ink-500/60">—</span> : r.deces) },
    {
      key: 'date',
      label: 'date ISO',
      render: (r) => (r.date ? <code className="text-xs">{r.date.toISOString().slice(0, 10)}</code> : '—'),
    },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-clinic-500" aria-hidden />
          <p className="eyebrow">Avant · brut</p>
        </div>
        <h3 className="font-display font-semibold text-lg text-ink-900 mb-3">
          {rawSample.rows.length} lignes bruyantes
        </h3>
        <p className="text-xs text-ink-500 mb-3">
          Casse, accents, vides et « n/a » mélangés.
        </p>
        <DataTable columns={rawCols} rows={rawSample.rows} />
      </div>
      <div className="card">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-brand-500" aria-hidden />
          <p className="eyebrow text-brand-700">Après · nettoyé</p>
        </div>
        <h3 className="font-display font-semibold text-lg text-ink-900 mb-3">
          {cleaned.rows.length} lignes conservées
        </h3>
        <p className="text-xs text-ink-500 mb-3">
          <span className="text-sun-700 font-medium">
            {cleaned.issues.length} ligne(s) signalée(s)
          </span>{' '}
          — filtrage transparent.
        </p>
        <DataTable columns={cleanedCols} rows={cleaned.rows} />
        {cleaned.issues.length > 0 && (
          <div className="mt-4 text-xs bg-sun-50 border border-sun-500/20 rounded-xl px-4 py-3">
            <p className="font-medium text-sun-700 mb-1">
              Lignes écartées ou signalées
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-ink-700">
              {cleaned.issues.map((iss) => (
                <li key={iss.index}>
                  ligne #{iss.index + 1} — {iss.reasons.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
