import { MessageCircle, Wrench, HeadphonesIcon, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: MessageCircle,
    title: 'Compra por WhatsApp',
    description: 'Coordina tu pedido directo con un asesor, sin complicaciones.',
  },
  {
    icon: Wrench,
    title: 'Armado de PC a medida',
    description: 'Te ayudamos a elegir cada componente según tu presupuesto.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Soporte especializado',
    description: 'Planes de soporte y mantenimiento para tus equipos.',
  },
  {
    icon: Sparkles,
    title: 'Productos seleccionados',
    description: 'Catálogo curado con las mejores marcas del mercado.',
  },
  {
    icon: ShieldCheck,
    title: 'Asesoría experta',
    description: 'Te orientamos para elegir el equipo ideal para ti.',
  },
]

export default function Benefits() {
  return (
    <section className="border-y border-oxxen-border bg-oxxen-surface/40 py-12 sm:py-16">
      <div className="container-oxxen">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {benefits.map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxxen-surface2 text-oxxen-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-oxxen-text">{b.title}</p>
                  <p className="mt-1 text-xs text-oxxen-muted">{b.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
