import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Clock, Menu, X } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { FOOTER_LINKS, NAV } from '../lib/site.js'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Analytics />
      <SpeedInsights />
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="inline-flex items-center gap-2 font-bold text-slate-900">
            <span className="inline-flex rounded-xl bg-blue-600 p-2 text-white">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              Convertisseur
              <span className="block text-xs font-semibold text-slate-500">Heures en centièmes</span>
            </span>
          </NavLink>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            Menu
          </button>
          <nav className="hidden flex-wrap justify-end gap-1 md:flex" aria-label="Pages">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {open && (
          <nav id="menu-principal" className="border-t border-slate-100 px-4 py-3 md:hidden" aria-label="Pages">
            <div className="mx-auto flex max-w-4xl flex-col gap-1">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl space-y-4 px-4 py-8 text-sm text-slate-600">
          <p>
            Aide au calcul des durées pour la paie et les relevés d’heures. Le bulletin établi par l’employeur, le contrat et la convention collective font foi. Ce site ne calcule ni un salaire, ni une majoration.
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Informations">
            {NAV.concat(FOOTER_LINKS).map((item) => (
              <NavLink key={item.to} to={item.to} className="font-medium text-blue-700 hover:underline">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Convertisseur Heures en Centièmes</p>
        </div>
      </footer>
    </div>
  )
}
