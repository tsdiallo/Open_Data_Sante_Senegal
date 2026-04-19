import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Home from './pages/Home.jsx'
import Epidemiologie from './pages/Epidemiologie.jsx'
import Demographie from './pages/Demographie.jsx'
import Infrastructures from './pages/Infrastructures.jsx'
import Nettoyage from './pages/Nettoyage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/epidemiologie" element={<Epidemiologie />} />
        <Route path="/demographie" element={<Demographie />} />
        <Route path="/infrastructures" element={<Infrastructures />} />
        <Route path="/nettoyage" element={<Nettoyage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
