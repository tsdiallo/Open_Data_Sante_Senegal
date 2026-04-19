const nf = new Intl.NumberFormat('fr-FR')
const df = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })

export function formatNumber(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return nf.format(n)
}

export function formatDate(d) {
  if (!d) return '—'
  const date = d instanceof Date ? d : new Date(d)
  return Number.isNaN(date.getTime()) ? '—' : df.format(date)
}

export function formatDensity(pop, km2) {
  if (!pop || !km2) return '—'
  return `${nf.format(Math.round(pop / km2))} hab/km²`
}
