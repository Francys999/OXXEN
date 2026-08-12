import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, Cpu } from 'lucide-react'
import SearchBar from './SearchBar'
import CategoriesMenu from './CategoriesMenu'
import MobileMenu from './MobileMenu'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/arma-tu-pc', label: 'Arma tu PC' },
  { to: '/planes', label: 'Planes' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, setCartOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-oxxen-bg/95 shadow-card backdrop-blur-md' : 'bg-oxxen-bg/80 backdrop-blur-md'
      } border-b border-oxxen-border`}
    >
      <div className="container-oxxen flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-oxxen-accent lg:h-10 lg:w-10">
            <Cpu className="h-5 w-5 text-oxxen-bg lg:h-6 lg:w-6" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-oxxen-text lg:text-2xl">
            OXX<span className="text-oxxen-accent">EN</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center gap-3 lg:flex">
          <CategoriesMenu />
          <SearchBar className="max-w-md flex-1" />
        </div>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-oxxen-accent' : 'text-oxxen-muted hover:text-oxxen-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-oxxen-border bg-oxxen-surface2 text-oxxen-text transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-oxxen-accent px-1 text-[11px] font-bold text-oxxen-bg">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-oxxen-border bg-oxxen-surface2 text-oxxen-text xl:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="border-t border-oxxen-border px-4 py-2.5 lg:hidden">
        <SearchBar />
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  )
}
