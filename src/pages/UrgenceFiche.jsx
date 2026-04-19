import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder.jsx'

export default function UrgenceFiche() {
  const { type } = useParams()
  return (
    <PagePlaceholder
      eyebrow={`Fiche urgence · ${type ?? ''}`}
      title="Conduite à tenir"
      description="Signes d'alerte, gestes à faire et à ne pas faire, quand appeler les urgences."
      phase="Phase 6"
    />
  )
}
