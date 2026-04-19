import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/epidemiologie', label: 'Épidémiologie' },
  { to: '/demographie', label: 'Démographie' },
  { to: '/infrastructures', label: 'Infrastructures' },
  { to: '/nettoyage', label: 'Nettoyage' },
]

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500 text-white shadow-sm group-hover:shadow-hover transition-shadow"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] uppercase tracking-[0.16em] text-ink-500 font-medium">
          Open Data
        </span>
        <span className="block font-display font-semibold text-ink-900 text-[17px] -mt-0.5">
          Santé <span className="italic text-brand-700">Sénégal</span>
        </span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'text-brand-700'
        : 'text-ink-700 hover:text-ink-900'
    }`

  const renderLink = (l) => (
    <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
      {({ isActive }) => (
        <>
          {l.label}
          {isActive && (
            <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-brand-500 rounded-full" />
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <header className="bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75 border-b border-ink-900/5 sticky top-0 z-20">
      <div className="h-[3px] flag-stripe" aria-hidden />
      <div className="container-page flex items-center justify-between h-16">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(renderLink)}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg text-ink-700 hover:bg-ink-900/5"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink-900/5 bg-paper">
          <div className="container-page py-2 flex flex-col">
            {LINKS.map(renderLink)}
          </div>
        </nav>
      )}
    </header>
  )
}
