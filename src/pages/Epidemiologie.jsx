import { useMemo, useState } from 'react'
import regions from '../data/regions.json'
import { useCleanedData } from '../hooks/useCleanedData.js'
import KpiCard from '../components/ui/KpiCard.jsx'
import ChartCard from '../components/ui/ChartCard.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'
import LineTimeSeries from '../components/charts/LineTimeSeries.jsx'
import BarByRegion from '../components/charts/BarByRegion.jsx'
import { formatNumber } from '../utils/format.js'

const REGION_BY_CODE = Object.fromEntries(regions.map((r) => [r.code, r.nom]))

export default function Epidemiologie() {
  const { meta, rows } = useCleanedData('epidemio')
  const [maladie, setMaladie] = useState('paludisme')
  const [regionCode, setRegionCode] = useState('ALL')

  const maladies = useMemo(
    () => Array.from(new Set(rows.map((r) => r.maladie))).sort(),
    [rows],
  )

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.maladie === maladie &&
          (regionCode === 'ALL' || r.region_code === regionCode),
      ),
    [rows, maladie, regionCode],
  )

  const timeSeries = useMemo(() => {
    const bySem = new Map()
    for (const r of filtered) {
      const key = r.semaine
      if (!bySem.has(key)) bySem.set(key, { semaine: `S${key}`, cas: 0, deces: 0 })
      bySem.get(key).cas += r.cas
      bySem.get(key).deces += r.deces ?? 0
    }
    return Array.from(bySem.values()).sort((a, b) => Number(a.semaine.slice(1)) - Number(b.semaine.slice(1)))
  }, [filtered])

  const byRegion = useMemo(() => {
    const m = new Map()
    for (const r of rows.filter((x) => x.maladie === maladie)) {
      const key = r.region_code
      m.set(key, (m.get(key) ?? 0) + r.cas)
    }
    return Array.from(m.entries())
      .map(([code, cas]) => ({ code, nom: REGION_BY_CODE[code] ?? code, cas }))
      .sort((a, b) => b.cas - a.cas)
  }, [rows, maladie])

  const totalCas = filtered.reduce((s, r) => s + r.cas, 0)
  const totalDeces = filtered.reduce((s, r) => s + (r.deces ?? 0), 0)
  const letalite = totalCas ? ((totalDeces / totalCas) * 100).toFixed(2) : '—'

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="eyebrow">Thème · 01</p>
        <h1 className="display text-4xl text-ink-900">Épidémiologie</h1>
        <p className="text-ink-700 max-w-2xl leading-relaxed">
          Cas hebdomadaires de maladies surveillées, par région.
        </p>
      </header>

      <FilterBar
        filters={[
          {
            id: 'maladie',
            label: 'Maladie',
            value: maladie,
            onChange: setMaladie,
            options: maladies.map((m) => ({ value: m, label: m[0].toUpperCase() + m.slice(1) })),
          },
          {
            id: 'region',
            label: 'Région',
            value: regionCode,
            onChange: setRegionCode,
            options: [
              { value: 'ALL', label: 'Toutes les régions' },
              ...regions.map((r) => ({ value: r.code, label: r.nom })),
            ],
          },
        ]}
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Cas cumulés" value={formatNumber(totalCas)} hint="sur la période affichée" />
        <KpiCard label="Décès" value={formatNumber(totalDeces)} tone="clinic" />
        <KpiCard label="Létalité" value={`${letalite}%`} hint="décès / cas" tone="sun" />
      </section>

      <ChartCard
        title="Évolution hebdomadaire"
        info="Nombre de cas déclarés chaque semaine. Une courbe qui monte signale une flambée ; qui baisse, une accalmie."
        source={meta.source}
        maj={meta.maj}
      >
        <LineTimeSeries
          data={timeSeries}
          xKey="semaine"
          series={[
            { key: 'cas', label: 'Cas' },
            { key: 'deces', label: 'Décès' },
          ]}
        />
      </ChartCard>

      <ChartCard
        title="Cas cumulés par région"
        info="Somme des cas de la maladie sélectionnée, toutes semaines confondues."
        source={meta.source}
        maj={meta.maj}
      >
        <BarByRegion data={byRegion} dataKey="cas" valueLabel="Cas" color="#E31B23" />
      </ChartCard>
    </div>
  )
}
