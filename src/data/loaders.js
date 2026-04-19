import etablissementsRaw from '../data/etablissements.json'
import pharmaciesRaw from '../data/pharmacies.json'

export function loadEtablissements() {
  return {
    meta: etablissementsRaw.meta ?? {},
    rows: etablissementsRaw.rows ?? [],
  }
}

export function loadPharmacies() {
  return {
    meta: pharmaciesRaw.meta ?? {},
    rows: pharmaciesRaw.rows ?? [],
  }
}
