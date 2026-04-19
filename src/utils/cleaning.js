import regions from '../data/regions.json'

const NAME_TO_CODE = regions.reduce((acc, r) => {
  acc[r.nom.toLowerCase()] = r.code
  return acc
}, {})

export function normalizeRegion(input) {
  if (!input) return null
  const s = String(input).trim()
  if (!s) return null
  const upper = s.toUpperCase()
  if (regions.some((r) => r.code === upper)) return upper
  const key = s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const match = Object.keys(NAME_TO_CODE).find(
    (n) => n.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === key,
  )
  return match ? NAME_TO_CODE[match] : null
}

export function parseWeek(annee, semaine) {
  const y = Number(annee)
  const w = Number(semaine)
  if (!y || !w) return null
  const jan4 = new Date(Date.UTC(y, 0, 4))
  const day = jan4.getUTCDay() || 7
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - day + 1 + (w - 1) * 7)
  return monday
}

export function coerceNumber(v) {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  if (s === '' || s === '-' || /^n\.?\/?a$/i.test(s)) return null
  const n = Number(s.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

export function cleanEpidemio(raw) {
  const rows = (raw?.rows ?? []).map((r) => ({
    region_code: normalizeRegion(r.region_code ?? r.region),
    maladie: String(r.maladie ?? '').toLowerCase().trim(),
    annee: coerceNumber(r.annee),
    semaine: coerceNumber(r.semaine),
    cas: coerceNumber(r.cas),
    deces: coerceNumber(r.deces),
    date: parseWeek(r.annee, r.semaine),
  }))
  const issues = rows
    .map((r, i) => {
      const reasons = []
      if (!r.region_code) reasons.push('région inconnue')
      if (r.cas === null) reasons.push('cas manquant')
      return reasons.length ? { index: i, reasons } : null
    })
    .filter(Boolean)
  return { meta: raw?.meta ?? {}, rows: rows.filter((r) => r.region_code && r.cas !== null), issues }
}

export function cleanList(raw) {
  return { meta: raw?.meta ?? {}, rows: raw?.rows ?? [] }
}
