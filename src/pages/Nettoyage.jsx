import DataCleaningExamples from '../components/DataCleaningExamples.jsx'
import CodeBlock from '../components/ui/CodeBlock.jsx'

const NORMALIZE_CODE = `// Harmonise les noms de régions en codes stables (DK, TH…)
export function normalizeRegion(input) {
  if (!input) return null
  const s = String(input).trim()
  const upper = s.toUpperCase()
  if (regions.some(r => r.code === upper)) return upper

  // Compare sans accents ni casse
  const key = s.toLowerCase()
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')

  const match = Object.keys(NAME_TO_CODE).find(
    n => n.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') === key,
  )
  return match ? NAME_TO_CODE[match] : null
}`

const PARSE_WEEK_CODE = `// Semaine ISO (lundi) -> objet Date, pour trier et afficher
export function parseWeek(annee, semaine) {
  const y = Number(annee), w = Number(semaine)
  if (!y || !w) return null
  const jan4 = new Date(Date.UTC(y, 0, 4))
  const day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - day + 1 + (w - 1) * 7)
  return monday
}`

const COERCE_CODE = `// "180" -> 180 ; "" | "-" | "n/a" -> null
export function coerceNumber(v) {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  if (s === '' || s === '-' || /^n\\.?\\/?a$/i.test(s)) return null
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}`

const STEPS = [
  {
    title: 'Harmoniser les noms',
    text: "« Dakar », « DAKAR », « dakar » et « DK » désignent la même région. On les convertit tous vers un code unique (DK, TH, ZG…). Cela rend les jointures fiables.",
  },
  {
    title: 'Convertir les dates',
    text: "Les bulletins donnent année + semaine. On reconstruit la date du lundi de la semaine ISO, ce qui permet de trier et d'afficher sur un axe temporel.",
  },
  {
    title: 'Gérer les valeurs manquantes',
    text: "« », « - » et « n/a » ne sont pas des nombres. On les transforme en null pour ne jamais afficher 0 à la place d'une donnée inconnue.",
  },
  {
    title: 'Signaler plutôt que masquer',
    text: "Les lignes problématiques (région inconnue, cas manquants) sont listées séparément. L'utilisateur voit qu'on a filtré — rien n'est caché.",
  },
]

export default function Nettoyage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="eyebrow">Méthode</p>
        <h1 className="display text-4xl text-ink-900">Nettoyage des données</h1>
        <p className="text-ink-700 max-w-2xl leading-relaxed">
          Une donnée brute n'est presque jamais directement utilisable. Voici
          les quatre étapes que nous appliquons pour rendre les jeux de
          données de ce site lisibles, comparables et honnêtes.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {STEPS.map((s, i) => (
          <div key={s.title} className="card relative overflow-hidden">
            <span className="absolute top-0 left-6 w-8 h-[3px] rounded-b bg-brand-500" aria-hidden />
            <p className="eyebrow mb-2">Étape {String(i + 1).padStart(2, '0')}</p>
            <h2 className="font-display font-semibold text-xl text-ink-900 mb-2">
              {s.title}
            </h2>
            <p className="text-sm text-ink-700 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display font-semibold text-2xl text-ink-900">
            Exemple concret
          </h2>
          <p className="text-sm text-ink-700 max-w-2xl mt-1">
            Un échantillon volontairement désordonné, puis le même échantillon
            après passage de la pipeline.
          </p>
        </div>
        <DataCleaningExamples />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-display font-semibold text-2xl text-ink-900">
            Les fonctions utilisées
          </h2>
          <p className="text-sm text-ink-700 max-w-2xl mt-1">
            Trois petites fonctions pures, aucune dépendance externe. Elles
            vivent dans{' '}
            <code className="px-1.5 py-0.5 rounded bg-ink-900/5 font-mono text-xs">
              src/utils/cleaning.js
            </code>.
          </p>
        </div>
        <div className="grid gap-4">
          <CodeBlock title="normalizeRegion()" code={NORMALIZE_CODE} />
          <CodeBlock title="parseWeek()" code={PARSE_WEEK_CODE} />
          <CodeBlock title="coerceNumber()" code={COERCE_CODE} />
        </div>
      </section>
    </div>
  )
}
