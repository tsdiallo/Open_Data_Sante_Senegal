import { useMemo } from 'react'
import regions from '../data/regions.json'
import KpiCard from '../components/ui/KpiCard.jsx'
import ChartCard from '../components/ui/ChartCard.jsx'
import DataTable from '../components/ui/DataTable.jsx'
import BarByRegion from '../components/charts/BarByRegion.jsx'
import { formatNumber, formatDensity } from '../utils/format.js'

const SOURCE = 'ANSD / RGPH-5'
const MAJ = '2023-12-01'

export default function Demographie() {
  const sorted = useMemo(
    () => [...regions].sort((a, b) => b.population - a.population),
    [],
  )
  const totalPop = useMemo(
    () => regions.reduce((s, r) => s + r.population, 0),
    [],
  )
  const totalKm2 = useMemo(
    () => regions.reduce((s, r) => s + r.superficie_km2, 0),
    [],
  )
  const densityAvg = Math.round(totalPop / totalKm2)

  const tableRows = sorted.map((r) => ({
    ...r,
    densite: Math.round(r.population / r.superficie_km2),
  }))

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="eyebrow">Thème · 02</p>
        <h1 className="display text-4xl text-ink-900">Démographie</h1>
        <p className="text-ink-700 max-w-2xl leading-relaxed">
          Population du Sénégal par région — chiffres du RGPH-5.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Population totale" value={formatNumber(totalPop)} hint="14 régions" />
        <KpiCard label="Superficie" value={`${formatNumber(totalKm2)} km²`} tone="sun" />
        <KpiCard label="Densité moyenne" value={`${formatNumber(densityAvg)} hab/km²`} tone="neutral" />
      </section>

      <ChartCard
        title="Population par région"
        info="Nombre d'habitants estimés par région. Les barres sont triées pour repérer vite les régions les plus peuplées."
        source={SOURCE}
        maj={MAJ}
      >
        <BarByRegion data={sorted} dataKey="population" valueLabel="Habitants" />
      </ChartCard>

      <ChartCard title="Détail par région" source={SOURCE} maj={MAJ}>
        <DataTable
          columns={[
            { key: 'nom', label: 'Région', render: (r) => <span className="font-medium text-ink-900">{r.nom}</span> },
            {
              key: 'population',
              label: 'Population',
              render: (r) => formatNumber(r.population),
            },
            {
              key: 'superficie_km2',
              label: 'Superficie',
              render: (r) => `${formatNumber(r.superficie_km2)} km²`,
            },
            {
              key: 'densite',
              label: 'Densité',
              render: (r) => formatDensity(r.population, r.superficie_km2),
            },
          ]}
          rows={tableRows}
        />
      </ChartCard>
    </div>
  )
}
