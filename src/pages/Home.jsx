import { Link } from 'react-router-dom'

const QUICK_ACTIONS = [
  {
    to: '/urgences',
    eyebrow: 'Urgence',
    title: 'Que faire en cas de crise ?',
    desc: 'Fiches AVC, douleur thoracique, paludisme et grippe. Conduite à tenir pas-à-pas.',
    accent: 'clinic',
  },
  {
    to: '/autour-de-moi',
    eyebrow: 'GPS',
    title: 'Trouver autour de moi',
    desc: "Hôpitaux, cliniques et pharmacies triés par distance avec votre position.",
    accent: 'brand',
  },
  {
    to: '/pharmacies',
    eyebrow: 'De garde',
    title: 'Pharmacie de garde',
    desc: 'Trouver la pharmacie ouverte la plus proche, avec son numéro direct.',
    accent: 'sun',
  },
  {
    to: '/ambulances',
    eyebrow: 'Transport',
    title: 'Ambulances',
    desc: 'SAMU, ambulances publiques et privées avec numéros en avant.',
    accent: 'brand',
  },
]

const ACCENT_BAR = {
  brand: 'bg-brand-500',
  sun: 'bg-sun-500',
  clinic: 'bg-clinic-500',
}

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="pt-4 sm:pt-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-[2px] bg-brand-500" />
            Plateforme santé · Sénégal
          </p>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl text-ink-900 leading-[1.05]">
            Accéder aux <span className="italic text-brand-700">bons soins</span>,
            <br className="hidden sm:block" />
            au bon moment.
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-2xl leading-relaxed">
            Urgences, hôpitaux, pharmacies de garde, ambulances, premiers secours :
            une plateforme claire pour agir vite et bien, partout au Sénégal.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:1515"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-clinic-500 text-white font-medium text-sm hover:bg-clinic-600 shadow-sm hover:shadow-hover transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Appeler SAMU — 1515
            </a>
            <Link
              to="/autour-de-moi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 shadow-sm hover:shadow-hover transition"
            >
              Trouver près de moi <span aria-hidden>→</span>
            </Link>
            <Link
              to="/urgences/orientation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-ink-900/10 bg-paper text-ink-900 font-medium text-sm hover:border-brand-500/40 transition"
            >
              Aide à la décision
            </Link>
          </div>

          <p className="mt-6 text-xs text-ink-500 max-w-xl">
            Cette plateforme ne remplace pas un avis médical. En cas de doute ou de signes graves, appelez les urgences.
          </p>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((c) => (
          <Link key={c.to} to={c.to} className="card-interactive group relative overflow-hidden">
            <span
              className={`absolute top-0 left-0 h-1 w-12 rounded-b-full ${ACCENT_BAR[c.accent]}`}
              aria-hidden
            />
            <p className="eyebrow mb-3">{c.eyebrow}</p>
            <h2 className="display text-xl text-ink-900 mb-2 leading-tight">{c.title}</h2>
            <p className="text-sm text-ink-700 leading-relaxed">{c.desc}</p>
            <p className="mt-5 text-sm font-medium text-brand-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Ouvrir <span aria-hidden>→</span>
            </p>
          </Link>
        ))}
      </section>

      <section className="card bg-gradient-to-br from-paper to-brand-50/40 border-brand-500/15">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-2 text-brand-700">Transparence</p>
            <h2 className="display text-2xl text-ink-900 mb-2">
              Données vérifiées, sources affichées
            </h2>
            <p className="text-sm text-ink-700 leading-relaxed">
              Chaque établissement, numéro ou tarif porte un badge de fiabilité
              (officiel, secondaire, scrapé, à vérifier). Aucun contenu médical
              n'est inventé.
            </p>
          </div>
          <Link
            to="/hopitaux"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-900 text-white text-sm font-medium hover:bg-ink-900/90 transition"
          >
            Voir les établissements <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
