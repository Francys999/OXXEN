import { Target, Eye, Heart, Users } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Misión',
    text: 'Acercar tecnología confiable y de calidad a cada persona y empresa, con asesoría honesta en todo el proceso.',
  },
  {
    icon: Eye,
    title: 'Visión',
    text: 'Ser la tienda tecnológica de referencia por su atención personalizada y catálogo curado.',
  },
  {
    icon: Heart,
    title: 'Valores',
    text: 'Transparencia, cercanía con el cliente y compromiso con el soporte post-venta.',
  },
]

export default function About() {
  return (
    <div className="container-oxxen py-8 sm:py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">Nosotros</h1>
        <p className="section-subtitle mx-auto max-w-2xl">
          Somos OXXEN, una tienda tecnológica enfocada en ofrecer productos seleccionados,
          asesoría cercana y soporte post-venta real. Este es un texto provisional de presentación
          mientras se define el contenido definitivo de la marca.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v) => {
          const Icon = v.icon
          return (
            <div key={v.title} className="card-surface p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-oxxen-accent/15 text-oxxen-accent">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-oxxen-text">{v.title}</h3>
              <p className="mt-2 text-sm text-oxxen-muted">{v.text}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-12 grid items-center gap-8 md:grid-cols-2">
        <div className="card-surface aspect-video overflow-hidden">
          <img
            src="https://placehold.co/800x450/11161f/00e5a0?font=montserrat&text=OXXEN+Team"
            alt="Equipo OXXEN"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-oxxen-accent2/15 text-oxxen-accent2">
            <Users className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-xl font-bold text-oxxen-text">Un equipo cercano a ti</h2>
          <p className="mt-3 text-sm leading-relaxed text-oxxen-muted">
            Contenido provisional: aquí se contará la historia de OXXEN, el equipo detrás de la
            marca y por qué somos la opción confiable para renovar o armar tu equipo. Este bloque
            se completará con información definitiva antes del lanzamiento.
          </p>
        </div>
      </div>
    </div>
  )
}
