import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, MessageCircle, ChevronRight, CheckCircle2, Truck, ShieldCheck } from 'lucide-react'
import { getProductById, products } from '../data/products'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import { buildWhatsAppLink } from '../config/site'
import ProductGrid from '../components/ProductGrid'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) return <Navigate to="/productos" replace />

  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discountPct = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const whatsappMessage = buildWhatsAppLink(
    `Hola OXXEN, quisiera consultar por el producto: ${product.name} (${formatPrice(product.price)}).`
  )

  return (
    <div className="container-oxxen py-8 sm:py-12">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-oxxen-muted">
        <Link to="/" className="hover:text-oxxen-accent">Inicio</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/productos" className="hover:text-oxxen-accent">Productos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-oxxen-text">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="card-surface relative aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {hasDiscount && (
            <span className="badge absolute left-4 top-4 bg-oxxen-accent text-oxxen-bg">-{discountPct}%</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-oxxen-accent2">{product.brand}</span>
          <h1 className="mt-2 text-2xl font-extrabold text-oxxen-text sm:text-3xl">{product.name}</h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-oxxen-text">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-base text-oxxen-muted line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>

          <p
            className={`mt-2 text-sm font-medium ${
              product.stock === 0 ? 'text-red-400' : product.stock <= 5 ? 'text-amber-400' : 'text-oxxen-accent'
            }`}
          >
            {product.stock === 0 ? 'Sin stock disponible' : `${product.stock} unidades disponibles`}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-oxxen-muted">{product.description}</p>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-oxxen-text">Características</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <li key={spec} className="flex items-start gap-2 text-sm text-oxxen-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-oxxen-accent" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-oxxen-border pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-oxxen-text">Cantidad</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text hover:border-oxxen-accent/50"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-oxxen-text">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text hover:border-oxxen-accent/50"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => product.stock > 0 && addToCart(product, qty)}
                disabled={product.stock === 0}
                className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingCart className="h-4 w-4" />
                Agregar al carrito
              </button>
              <a href={whatsappMessage} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-oxxen-border bg-oxxen-surface2 px-3 py-2.5 text-xs text-oxxen-muted">
              <Truck className="h-4 w-4 text-oxxen-accent" />
              Coordinación de envío por WhatsApp
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-oxxen-border bg-oxxen-surface2 px-3 py-2.5 text-xs text-oxxen-muted">
              <ShieldCheck className="h-4 w-4 text-oxxen-accent" />
              Garantía del fabricante
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-6">Productos relacionados</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
