import { Link } from 'react-router-dom'
import { ArrowRight, Wrench, MessageCircle } from 'lucide-react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Benefits from '../components/Benefits'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'
import { buildWhatsAppLink } from '../config/site'

export default function Home() {
  const featured = products.slice(0, 8)

  return (
    <>
      <Hero />
      <Categories />

      <section className="container-oxxen py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="section-title">Productos destacados</h2>
            <p className="section-subtitle">Lo más elegido por nuestros clientes</p>
          </div>
          <Link
            to="/productos"
            className="hidden items-center gap-1 text-sm font-semibold text-oxxen-accent hover:underline sm:flex"
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className="mt-8 flex justify-center sm:hidden">
          <Link to="/productos" className="btn-secondary">
            Ver todo el catálogo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Benefits />

      <section className="container-oxxen py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card-surface flex flex-col justify-between overflow-hidden p-8">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-oxxen-accent/15 text-oxxen-accent">
                <Wrench className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-oxxen-text">¿Arma tu propia PC?</h3>
              <p className="mt-2 text-sm text-oxxen-muted">
                Selecciona cada componente y calcula el precio total al instante. Nosotros te
                asesoramos en el proceso.
              </p>
            </div>
            <Link to="/arma-tu-pc" className="btn-primary mt-6 w-fit">
              Empezar ahora <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card-surface flex flex-col justify-between overflow-hidden p-8">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-oxxen-text">¿Prefieres hablar con un asesor?</h3>
              <p className="mt-2 text-sm text-oxxen-muted">
                Escríbenos por WhatsApp y te ayudamos a elegir el equipo perfecto para tus necesidades.
              </p>
            </div>
            <a
              href={buildWhatsAppLink('Hola OXXEN, quisiera asesoría para elegir un equipo.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-6 w-fit"
            >
              Chatear ahora <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
