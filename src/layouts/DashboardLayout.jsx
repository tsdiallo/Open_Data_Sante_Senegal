import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar.jsx'
import Footer from '../components/ui/Footer.jsx'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container-page py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
