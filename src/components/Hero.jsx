import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    eyebrow: 'Nueva colección',
    title: 'Tecnología de punta al mejor precio',
    subtitle: 'Laptops, PCs y componentes seleccionados para gamers, creadores y profesionales.',
    cta: 'Ver productos',
    to: '/productos',
    gradient: 'from-oxxen-accent/20 via-oxxen-bg to-oxxen-bg',
    accent: 'text-oxxen-accent',
  },
  {
    id: 2,
    eyebrow: 'Personaliza tu equipo',
    title: 'Arma tu PC ideal, pieza por pieza',
    subtitle: 'Elige procesador, tarjeta gráfica, RAM y más. Nosotros te ayudamos con el resto.',
    cta: 'Arma tu PC',
    to: '/arma-tu-pc',
    gradient: 'from-oxxen-accent2/20 via-oxxen-bg to-oxxen-bg',
    accent: 'text-oxxen-accent2',
  },
  {
    id: 3,
    eyebrow: 'Soporte OXXEN',
    title: 'Planes de soporte y mantenimiento',
    subtitle: 'Asistencia técnica prioritaria y mantenimiento preventivo para tus equipos.',
    cta: 'Ver planes',
    to: '/planes',
    gradient: 'from-oxxen-accent/10 via-oxxen-bg to-oxxen-bg',
    accent: 'text-oxxen-accent',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative overflow-hidden border-b border-oxxen-border">
      <div className="relative h-[420px] sm:h-[460px] lg:h-[520px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="container-oxxen flex h-full flex-col justify-center">
              <div className="max-w-xl animate-slideUp">
                <span className={`badge border border-current/30 bg-oxxen-surface2 ${slide.accent}`}>
                  {slide.eyebrow}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-oxxen-text sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base text-oxxen-muted sm:text-lg">{slide.subtitle}</p>
                <Link to={slide.to} className="btn-primary mt-7 w-fit">
                  {slide.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -right-24 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full bg-oxxen-accent/10 blur-3xl sm:block lg:h-96 lg:w-96"
            />
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-oxxen-border bg-oxxen-bg/70 text-oxxen-text backdrop-blur-sm transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent sm:left-6"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-oxxen-border bg-oxxen-bg/70 text-oxxen-text backdrop-blur-sm transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent sm:right-6"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-oxxen-accent' : 'w-1.5 bg-oxxen-border'
              }`}
              aria-label={`Ir a la promoción ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
