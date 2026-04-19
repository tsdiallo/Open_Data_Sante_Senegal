import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Home from './pages/Home.jsx'
import AutourDeMoi from './pages/AutourDeMoi.jsx'
import Urgences from './pages/Urgences.jsx'
import UrgenceFiche from './pages/UrgenceFiche.jsx'
import UrgenceOrientation from './pages/UrgenceOrientation.jsx'
import Hopitaux from './pages/Hopitaux.jsx'
import HopitalFiche from './pages/HopitalFiche.jsx'
import Pharmacies from './pages/Pharmacies.jsx'
import Ambulances from './pages/Ambulances.jsx'
import Medicaments from './pages/Medicaments.jsx'
import Tarifs from './pages/Tarifs.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/autour-de-moi" element={<AutourDeMoi />} />
        <Route path="/urgences" element={<Urgences />} />
        <Route path="/urgences/orientation" element={<UrgenceOrientation />} />
        <Route path="/urgences/:type" element={<UrgenceFiche />} />
        <Route path="/hopitaux" element={<Hopitaux />} />
        <Route path="/hopitaux/:id" element={<HopitalFiche />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/ambulances" element={<Ambulances />} />
        <Route path="/medicaments" element={<Medicaments />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
