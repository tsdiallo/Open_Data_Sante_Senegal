import { useMemo, useState } from 'react'
import regions from '../data/regions.json'
import { useCleanedData } from '../hooks/useCleanedData.js'
import KpiCard from '../components/ui/KpiCard.jsx'
import ChartCard from '../components/ui/ChartCard.jsx'
import FilterBar from '../components/ui/FilterBar.jsx'
import DataTable from '../components/ui/DataTable.jsx'

const REGION_BY_CODE = Object.fromEntries(regions.map((r) => [r.code, r.nom]))

export default function Infrastructures() {
  const etabs = useCleanedData('etablissements')
  const pharms = useCleanedData('pharmacies')

  const [regionCode, setRegionCode] = useState('ALL')
  const [type, setType] = useState('ALL')
  const [onlyGarde, setOnlyGarde] = useState(false)
  const [q, setQ] = useState('')

  const types = useMemo(
    () => Array.from(new Set(etabs.rows.map((r) => r.type))).sort(),
    [etabs.rows],
  )

  const filteredEtabs = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return etabs.rows.filter(
      (r) =>
        (regionCode === 'ALL' || r.region_code === regionCode) &&
        (type === 'ALL' || r.type === type) &&
        (!needle ||
          r.nom.toLowerCase().includes(needle) ||
          r.commune.toLowerCase().includes(needle)),
    )
  }, [etabs.rows, regionCode, type, q])

  const filteredPharms = useMemo(
    () =>
      pharms.rows.filter(
        (p) =>
          (regionCode === 'ALL' || p.region_code === regionCode) &&
          (!onlyGarde || p.de_garde),
      ),
    [pharms.rows, regionCode, onlyGarde],
  )

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="eyebrow">Thème · 03</p>
        <h1 className="display text-4xl text-ink-900">
          Hôpitaux &amp; pharmacies
        </h1>
        <p className="text-ink-700 max-w-2xl leading-relaxed">
          Annuaire des établissements de santé et pharmacies de garde.
        </p>
      </header>

      <FilterBar
        filters={[
          {
            id: 'region',
            label: 'Région',
            value: regionCode,
            onChange: setRegionCode,
            options: [
              { value: 'ALL', label: 'Toutes' },
              ...regions.map((r) => ({ value: r.code, label: r.nom })),
            ],
          },
          {
            id: 'type',
            label: 'Type',
            value: type,
            onChange: setType,
            options: [
              { value: 'ALL', label: 'Tous' },
              ...types.map((t) => ({ value: t, label: t })),
            ],
          },
        ]}
      >
        <label className="flex flex-col text-xs flex-1 min-w-[200px]">
          <span className="eyebrow mb-1.5">Recherche</span>
          <input
            type="search"
            placeholder="Nom ou commune…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border border-ink-900/10 rounded-xl px-3 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/60 transition"
          />
        </label>
      </FilterBar>

      <section className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Établissements listés" value={filteredEtabs.length} />
        <KpiCard label="Pharmacies" value={filteredPharms.length} tone="sun" />
        <KpiCard
          label="De garde aujourd'hui"
          value={pharms.rows.filter((p) => p.de_garde).length}
          hint={pharms.meta?.date_garde ? `Au ${pharms.meta.date_garde}` : null}
          tone="clinic"
        />
      </section>

      <ChartCard
        title="Établissements de santé"
        info="Liste consolidée des hôpitaux et centres de santé. Utilisez les filtres pour cibler une région ou un type."
        source={etabs.meta?.source}
        maj={etabs.meta?.maj}
      >
        <DataTable
          columns={[
            { key: 'nom', label: 'Nom', render: (r) => <span className="font-medium text-ink-900">{r.nom}</span> },
            {
              key: 'type',
              label: 'Type',
              render: (r) => (
                <span className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-500/15">
                  {r.type}
                </span>
              ),
            },
            {
              key: 'region_code',
              label: 'Région',
              render: (r) => REGION_BY_CODE[r.region_code] ?? r.region_code,
            },
            { key: 'commune', label: 'Commune' },
            {
              key: 'telephone',
              label: 'Téléphone',
              render: (r) => r.telephone || <span className="text-ink-500/60">—</span>,
            },
          ]}
          rows={filteredEtabs}
        />
      </ChartCard>

      <ChartCard
        title="Pharmacies"
        info="Cochez « de garde » pour ne voir que les pharmacies ouvertes en garde à la date indiquée."
        source={pharms.meta?.source}
        maj={pharms.meta?.maj}
      >
        <div className="mb-4">
          <label className="inline-flex items-center gap-2 text-sm text-ink-900 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyGarde}
              onChange={(e) => setOnlyGarde(e.target.checked)}
              className="w-4 h-4 accent-brand-500 rounded"
            />
            Afficher uniquement les pharmacies de garde
          </label>
        </div>
        <DataTable
          columns={[
            { key: 'nom', label: 'Nom', render: (p) => <span className="font-medium text-ink-900">{p.nom}</span> },
            {
              key: 'region_code',
              label: 'Région',
              render: (p) => REGION_BY_CODE[p.region_code] ?? p.region_code,
            },
            { key: 'commune', label: 'Commune' },
            { key: 'adresse', label: 'Adresse' },
            {
              key: 'de_garde',
              label: 'Garde',
              render: (p) =>
                p.de_garde ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-clinic-700 bg-clinic-50 border border-clinic-500/20 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-clinic-500 animate-pulse" />
                    De garde
                  </span>
                ) : (
                  <span className="text-[11px] text-ink-500/60">—</span>
                ),
            },
          ]}
          rows={filteredPharms}
        />
      </ChartCard>
    </div>
  )
}
