import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { buildWhatsAppLink } from '../config/site'

const plans = [
  {
    id: 'basico',
    name: 'Básico',
    description: 'Ideal para quienes necesitan soporte puntual.',
    features: ['Soporte básico remoto', 'Asistencia por WhatsApp', 'Orientación en compras'],
    highlighted: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Nuestro plan más elegido por hogares y pequeñas oficinas.',
    features: [
      'Soporte técnico remoto y presencial',
      'Mantenimiento preventivo periódico',
      'Atención prioritaria',
      'Asistencia por WhatsApp',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Cobertura integral para empresas y usuarios exigentes.',
    features: [
      'Soporte técnico especializado',
      'Mantenimiento preventivo y correctivo',
      'Atención prioritaria 24/7',
      'Posible garantía extendida',
    ],
    highlighted: false,
  },
]

export default function Plans() {
  return (
    <div className="container-oxxen py-8 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">Planes OXXEN</h1>
        <p className="section-subtitle mx-auto max-w-xl">
          Soporte técnico y mantenimiento pensado para acompañarte después de tu compra.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 hover:-translate-y-1 ${
              plan.highlighted
                ? 'border-oxxen-accent bg-oxxen-surface shadow-glow md:scale-105'
                : 'border-oxxen-border bg-oxxen-surface'
            }`}
          >
            {plan.highlighted && (
              <span className="badge absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 bg-oxxen-accent text-oxxen-bg">
                <Sparkles className="h-3 w-3" /> Recomendado
              </span>
            )}
            <h3 className="text-xl font-bold text-oxxen-text">{plan.name}</h3>
            <p className="mt-2 text-sm text-oxxen-muted">{plan.description}</p>

            <div className="mt-6">
              <span className="text-2xl font-extrabold text-oxxen-accent">Consultar</span>
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-oxxen-text">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-oxxen-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppLink(`Hola OXXEN, quisiera más información sobre el plan ${plan.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={plan.highlighted ? 'btn-primary mt-8 w-full' : 'btn-secondary mt-8 w-full'}
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
