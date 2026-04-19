import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-20 space-y-5">
      <p className="eyebrow">Erreur · 404</p>
      <h1 className="display text-4xl text-ink-900">Page introuvable</h1>
      <p className="text-ink-700 max-w-md mx-auto">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition"
      >
        Retour à l'accueil <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
