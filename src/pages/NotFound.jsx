import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-16 space-y-4">
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p className="text-slate-600">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="text-brand-700 font-medium hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  )
}
