import { Link } from 'react-router-dom'
import { Cpu, Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { SITE, buildWhatsAppLink } from '../config/site'

const columns = [
  {
    title: 'Tienda',
    links: [
      { label: 'Productos', to: '/productos' },
      { label: 'Arma tu PC', to: '/arma-tu-pc' },
      { label: 'Planes OXXEN', to: '/planes' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', to: '/nosotros' },
      { label: 'Contacto', to: '/contacto' },
    ],
  },
  {
    title: 'Categorías',
    links: [
      { label: 'Laptops', to: '/productos?categoria=laptops' },
      { label: 'Gaming', to: '/productos?categoria=gaming' },
      { label: 'Componentes', to: '/productos?categoria=componentes' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-oxxen-border bg-oxxen-surface">
      <div className="container-oxxen grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-oxxen-accent">
              <Cpu className="h-5 w-5 text-oxxen-bg" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-extrabold text-oxxen-text">
              OXX<span className="text-oxxen-accent">EN</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-oxxen-muted">
            Tienda online de tecnología: laptops, PCs, componentes y periféricos. Armamos tu equipo
            ideal y te acompañamos con soporte especializado.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-muted transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-muted transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={buildWhatsAppLink('Hola OXXEN, quisiera más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-muted transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-oxxen-text">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-oxxen-muted transition-colors hover:text-oxxen-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-oxxen-text">Contacto</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-oxxen-muted">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-oxxen-accent" />
              {SITE.phone}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-oxxen-accent" />
              {SITE.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oxxen-accent" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-oxxen-border py-5">
        <div className="container-oxxen flex flex-col items-center justify-between gap-2 text-xs text-oxxen-muted sm:flex-row">
          <p>© {new Date().getFullYear()} OXXEN. Todos los derechos reservados.</p>
          <p>Prototipo de presentación — sin procesamiento de pagos.</p>
        </div>
      </div>
    </footer>
  )
}
