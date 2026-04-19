import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder.jsx'

export default function HopitalFiche() {
  const { id } = useParams()
  return (
    <PagePlaceholder
      eyebrow={`Fiche · ${id ?? ''}`}
      title="Établissement"
      description="Coordonnées, spécialités, horaires, urgence, ambulance, actions (appeler, itinéraire, partager, signaler)."
      phase="Phase 7"
    />
  )
}
