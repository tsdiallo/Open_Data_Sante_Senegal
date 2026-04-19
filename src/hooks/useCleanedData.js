import { useMemo } from 'react'
import epidemioRaw from '../data/epidemio.json'
import etablissementsRaw from '../data/etablissements.json'
import pharmaciesRaw from '../data/pharmacies.json'
import { cleanEpidemio, cleanList } from '../utils/cleaning.js'

const SOURCES = {
  epidemio: () => cleanEpidemio(epidemioRaw),
  etablissements: () => cleanList(etablissementsRaw),
  pharmacies: () => cleanList(pharmaciesRaw),
}

export function useCleanedData(source) {
  return useMemo(() => {
    const fn = SOURCES[source]
    if (!fn) return { meta: {}, rows: [], issues: [] }
    return fn()
  }, [source])
}
