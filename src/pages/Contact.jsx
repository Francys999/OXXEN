import { useState } from 'react'
import { MessageCircle, Phone, Mail, MapPin, Facebook, Instagram, Send, CheckCircle2 } from 'lucide-react'
import { SITE, buildWhatsAppLink } from '../config/site'

const infoItems = [
  { icon: MessageCircle, label: 'WhatsApp', value: SITE.phone, href: buildWhatsAppLink('Hola OXXEN, quisiera más información.') },
  { icon: Phone, label: 'Teléfono', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Correo', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: 'Dirección', value: SITE.address, href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container-oxxen py-8 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle mx-auto max-w-xl">
          ¿Tienes dudas o necesitas asesoría? Escríbenos, con gusto te ayudamos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {infoItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-oxxen-accent/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-oxxen-accent/15 text-oxxen-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-oxxen-muted">{item.label}</p>
                  <p className="text-sm font-semibold text-oxxen-text">{item.value}</p>
                </div>
              </a>
            )
          })}

          <div className="card-surface flex items-center gap-3 p-5">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-muted hover:border-oxxen-accent/50 hover:text-oxxen-accent"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-muted hover:border-oxxen-accent/50 hover:text-oxxen-accent"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card-surface p-6 sm:p-8">
            {sent && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-oxxen-accent/30 bg-oxxen-accent/10 px-4 py-3 text-sm text-oxxen-accent">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                ¡Gracias! Este es un formulario de demostración — te contactaremos por WhatsApp o correo.
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-oxxen-text">Nombre</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-oxxen"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-oxxen-text">Correo electrónico</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-oxxen"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-oxxen-text">Mensaje</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="input-oxxen resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              <button type="submit" className="btn-primary mt-2 w-fit">
                <Send className="h-4 w-4" />
                Enviar mensaje
              </button>
              <p className="text-xs text-oxxen-muted">
                * Formulario visual de demostración, sin envío real. Para una respuesta inmediata,
                usa WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
