import { Link } from 'react-router-dom'
import { ShoppingCart, Eye } from 'lucide-react'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discountPct = hasDiscount
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0
  const lowStock = product.stock > 0 && product.stock <= 5

  return (
    <div className="card-surface group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-oxxen-accent/50">
      <Link to={`/productos/${product.id}`} className="relative block aspect-square overflow-hidden bg-oxxen-surface2">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="badge absolute left-3 top-3 bg-oxxen-accent text-oxxen-bg">-{discountPct}%</span>
        )}
        {product.stock === 0 && (
          <span className="badge absolute right-3 top-3 bg-red-500/90 text-white">Agotado</span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-oxxen-accent2">{product.brand}</span>
        <Link to={`/productos/${product.id}`} className="line-clamp-2 text-sm font-semibold text-oxxen-text hover:text-oxxen-accent">
          {product.name}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-oxxen-text">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-oxxen-muted line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <p className={`text-xs font-medium ${product.stock === 0 ? 'text-red-400' : lowStock ? 'text-amber-400' : 'text-oxxen-muted'}`}>
          {product.stock === 0 ? 'Sin stock' : lowStock ? `¡Solo quedan ${product.stock}!` : `${product.stock} disponibles`}
        </p>

        <div className="mt-auto flex gap-2 pt-3">
          <Link
            to={`/productos/${product.id}`}
            className="btn-secondary flex-1 !px-3 !py-2 text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            Ver
          </Link>
          <button
            onClick={() => product.stock > 0 && addToCart(product, 1)}
            disabled={product.stock === 0}
            className="btn-primary flex-1 !px-3 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
