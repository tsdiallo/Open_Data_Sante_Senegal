import { Link } from 'react-router-dom'

const CARDS = [
  {
    to: '/epidemiologie',
    title: 'Épidémiologie',
    desc: "Suivre les cas hebdomadaires de maladies (paludisme, dengue) par région.",
  },
  {
    to: '/demographie',
    title: 'Démographie',
    desc: "Explorer la population du Sénégal par région (RGPH-5).",
  },
  {
    to: '/infrastructures',
    title: 'Hôpitaux & pharmacies',
    desc: "Trouver un établissement de santé ou une pharmacie de garde.",
  },
]

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Comprendre les données de santé du Sénégal
        </h1>
        <p className="text-slate-600">
          Une plateforme simple pour explorer, visualiser et comprendre des
          données publiques de santé, de démographie et d'infrastructures
          sanitaires.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="card hover:shadow-md hover:border-brand-500 transition"
          >
            <h2 className="font-semibold text-slate-900 mb-2">{c.title}</h2>
            <p className="text-sm text-slate-600">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">Comment sont nettoyées les données ?</h2>
        <p className="text-sm text-slate-600 mb-3">
          Nous montrons aussi comment une donnée brute devient une donnée
          lisible : harmonisation des noms, conversion des dates, gestion des
          valeurs manquantes.
        </p>
        <Link to="/nettoyage" className="text-brand-700 text-sm font-medium hover:underline">
          Voir la page Nettoyage →
        </Link>
      </section>
    </div>
  )
}
