import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/autour-de-moi', label: 'Autour de moi' },
  { to: '/urgences', label: 'Urgences', emphasis: true },
  { to: '/hopitaux', label: 'Hôpitaux' },
  { to: '/pharmacies', label: 'Pharmacies' },
  { to: '/ambulances', label: 'Ambulances' },
  { to: '/medicaments', label: 'Médicaments' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/admin', label: 'Admin' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group shrink-0">
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500 text-white shadow-sm group-hover:shadow-hover transition-shadow"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" fill="currentColor" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-500 font-medium">
          Santé
        </span>
        <span className="block font-display font-semibold text-ink-900 text-[17px] -mt-0.5">
          <span className="italic text-brand-700">Sénégal</span>
        </span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }, emphasis) =>
    `relative px-3 py-2 text-sm font-medium transition whitespace-nowrap ${
      emphasis
        ? isActive
          ? 'text-clinic-700'
          : 'text-clinic-600 hover:text-clinic-700'
        : isActive
          ? 'text-brand-700'
          : 'text-ink-700 hover:text-ink-900'
    }`

  const renderLink = (l) => (
    <NavLink
      key={l.to}
      to={l.to}
      className={(s) => linkClass(s, l.emphasis)}
      onClick={() => setOpen(false)}
    >
      {({ isActive }) => (
        <>
          {l.label}
          {isActive && (
            <span
              className={`absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full ${
                l.emphasis ? 'bg-clinic-500' : 'bg-brand-500'
              }`}
            />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header className="bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75 border-b border-ink-900/5 sticky top-0 z-20">
      <div className="h-[3px] flag-stripe" aria-hidden />
      <div className="container-page flex items-center justify-between h-16 gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-0.5">
          {LINKS.map(renderLink)}
        </nav>

        <a
          href="tel:1515"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-clinic-500 text-white text-sm font-medium hover:bg-clinic-600 shadow-sm transition shrink-0"
          aria-label="Appeler le SAMU"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          SAMU 1515
        </a>

        <button
          className="lg:hidden p-2 rounded-lg text-ink-700 hover:bg-ink-900/5"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink-900/5 bg-paper">
          <div className="container-page py-2 flex flex-col">
            <NavLink
              to="/"
              end
              className={(s) => linkClass(s, false)}
              onClick={() => setOpen(false)}
            >
              Accueil
            </NavLink>
            {LINKS.map(renderLink)}
          </div>
        </nav>
      )}
    </header>
  )
}
