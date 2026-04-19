export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="h-[2px] flag-stripe" aria-hidden />
      <div className="bg-paper border-t border-ink-900/5">
        <div className="container-page py-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-ink-500">
          <p>
            <span className="font-display font-semibold text-ink-900">
              Open Data Santé Sénégal
            </span>{' '}
            — MVP pédagogique, données publiques agrégées.
          </p>
          <p className="text-xs">
            Sources : ANSD · information.sante.gouv.sn · Annuaire eSanté
          </p>
        </div>
      </div>
    </footer>
  )
}
