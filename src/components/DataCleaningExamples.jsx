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
    { key: 'region_code', label: 'region_code' },
    { key: 'maladie', label: 'maladie' },
    { key: 'annee', label: 'annee' },
    { key: 'semaine', label: 'semaine' },
    { key: 'cas', label: 'cas', render: (r) => (r.cas === null ? '—' : r.cas) },
    { key: 'deces', label: 'deces', render: (r) => (r.deces === null ? '—' : r.deces) },
    {
      key: 'date',
      label: 'date (lundi ISO)',
      render: (r) => (r.date ? r.date.toISOString().slice(0, 10) : '—'),
    },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="font-semibold text-slate-900 mb-1">Avant — données brutes</h3>
        <p className="text-xs text-slate-500 mb-3">
          {rawSample.rows.length} lignes. Casse, accents, vides et « n/a » mélangés.
        </p>
        <DataTable columns={rawCols} rows={rawSample.rows} />
      </div>
      <div className="card">
        <h3 className="font-semibold text-slate-900 mb-1">Après — données nettoyées</h3>
        <p className="text-xs text-slate-500 mb-3">
          {cleaned.rows.length} lignes conservées ·{' '}
          <span className="text-amber-700">
            {cleaned.issues.length} ligne(s) signalée(s)
          </span>
        </p>
        <DataTable columns={cleanedCols} rows={cleaned.rows} />
        {cleaned.issues.length > 0 && (
          <div className="mt-4 text-xs text-slate-600">
            <p className="font-medium text-slate-800 mb-1">Lignes écartées ou signalées :</p>
            <ul className="list-disc pl-5 space-y-0.5">
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
