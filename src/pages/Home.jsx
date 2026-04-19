import { Link } from 'react-router-dom'

const CARDS = [
  {
    to: '/epidemiologie',
    eyebrow: '01',
    title: 'Épidémiologie',
    desc: 'Cas hebdomadaires de paludisme, dengue et autres maladies surveillées, par région.',
    accent: 'clinic',
  },
  {
    to: '/demographie',
    eyebrow: '02',
    title: 'Démographie',
    desc: 'Population, superficie et densité des 14 régions du Sénégal (RGPH-5).',
    accent: 'brand',
  },
  {
    to: '/infrastructures',
    eyebrow: '03',
    title: 'Hôpitaux & pharmacies',
    desc: "Annuaire filtrable des établissements de santé et pharmacies de garde.",
    accent: 'sun',
  },
]

const ACCENT_BAR = {
  brand: 'bg-brand-500',
  sun: 'bg-sun-500',
  clinic: 'bg-clinic-500',
}

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="pt-6 sm:pt-10">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-[2px] bg-brand-500" />
            Plateforme ouverte · Sénégal
          </p>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl text-ink-900 leading-[1.05]">
            Comprendre la <span className="italic text-brand-700">santé</span> du Sénégal,
            <br className="hidden sm:block" />
            à travers la donnée.
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-2xl leading-relaxed">
            Explorez, visualisez et interrogez des jeux de données publics
            d'épidémiologie, de démographie et d'infrastructures sanitaires.
            Simple, transparent, pensé pour tous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/epidemiologie"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 shadow-sm hover:shadow-hover transition"
            >
              Explorer les données
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/nettoyage"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-ink-900/10 bg-paper text-ink-900 font-medium text-sm hover:border-brand-500/40 transition"
            >
              Voir la méthode
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.to} to={c.to} className="card-interactive group relative overflow-hidden">
            <span
              className={`absolute top-0 left-0 h-1 w-12 rounded-b-full ${ACCENT_BAR[c.accent]}`}
              aria-hidden
            />
            <p className="eyebrow mb-3">{c.eyebrow}</p>
            <h2 className="display text-2xl text-ink-900 mb-2">{c.title}</h2>
            <p className="text-sm text-ink-700 leading-relaxed">{c.desc}</p>
            <p className="mt-5 text-sm font-medium text-brand-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Explorer <span aria-hidden>→</span>
            </p>
          </Link>
        ))}
      </section>

      <section className="card bg-gradient-to-br from-paper to-brand-50/40 border-brand-500/15">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-2 text-brand-700">Transparence</p>
            <h2 className="display text-2xl text-ink-900 mb-2">
              Comment les données sont-elles nettoyées ?
            </h2>
            <p className="text-sm text-ink-700 leading-relaxed">
              Une donnée brute est rarement lisible. Nous documentons chaque
              étape : harmonisation des noms, conversion des dates, gestion
              des valeurs manquantes.
            </p>
          </div>
          <Link
            to="/nettoyage"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-900 text-white text-sm font-medium hover:bg-ink-900/90 transition"
          >
            Voir la méthode <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
