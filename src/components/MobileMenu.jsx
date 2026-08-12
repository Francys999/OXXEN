import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { X, Cpu, MessageCircle } from 'lucide-react'
import { categories } from '../data/categories'
import { buildWhatsAppLink } from '../config/site'

export default function MobileMenu({ open, onClose, links }) {
  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-oxxen-surface transition-transform duration-300 xl:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-oxxen-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-oxxen-accent">
              <Cpu className="h-4 w-4 text-oxxen-bg" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-extrabold text-oxxen-text">
              OXX<span className="text-oxxen-accent">EN</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
                    isActive ? 'bg-oxxen-surface2 text-oxxen-accent' : 'text-oxxen-text hover:bg-oxxen-surface2'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-oxxen-muted">
              Categorías
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <NavLink
                    key={cat.id}
                    to={`/productos?categoria=${cat.id}`}
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-xl border border-oxxen-border bg-oxxen-surface2 px-3 py-2.5 text-xs font-medium text-oxxen-text hover:border-oxxen-accent/50 hover:text-oxxen-accent"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-oxxen-accent" />
                    <span className="truncate">{cat.name}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-oxxen-border p-5">
          <a
            href={buildWhatsAppLink('Hola OXXEN, quisiera más información.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full"
          >
            <MessageCircle className="h-4 w-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </aside>
    </>,
    document.body
  )
}
